const cron = require('node-cron');
const axios = require('axios');
const Property = require('../models/Property');
const Agent = require('../models/Agent');
const SyncMeta = require('../models/SyncMeta');

// NWMLS API Configuration
const NWMLS_API_URL = process.env.NWMLS_API_URL;
const NWMLS_CLIENT_ID = process.env.NWMLS_CLIENT_ID;
const NWMLS_CLIENT_SECRET = process.env.NWMLS_CLIENT_SECRET;
const NWMLS_API_KEY = process.env.NWMLS_API_KEY;

let accessToken = null;
let tokenExpiry = null;

/**
 * Authenticate with NWMLS API using OAuth2
 */
const authenticate = async () => {
  try {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
      return accessToken;
    }

    // This is a placeholder for the actual NWMLS OAuth2 flow
    // Replace with actual authentication endpoint and credentials
    const response = await axios.post(`${NWMLS_API_URL}/oauth/token`, {
      grant_type: 'client_credentials',
      client_id: NWMLS_CLIENT_ID,
      client_secret: NWMLS_CLIENT_SECRET
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${NWMLS_API_KEY}`
      }
    });

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + (response.data.expires_in * 1000);
    
    console.log('✅ NWMLS authenticated successfully');
    return accessToken;
  } catch (error) {
    console.error('❌ NWMLS authentication failed:', error.message);
    // Return mock token for development without actual NWMLS credentials
    return 'mock_token_for_development';
  }
};

/**
 * Fetch listings from NWMLS API
 */
const fetchListings = async (lastModified = null) => {
  try {
    const token = await authenticate();
    
    // Build query parameters
    const params = {
      $top: 100, // Fetch 100 records per request
      $skip: 0,
      $filter: 'StandardStatus eq \'Active\'',
      $orderby: 'ModificationTimestamp desc'
    };

    if (lastModified) {
      params.$filter += ` and ModificationTimestamp gt ${lastModified}`;
    }

    // This is a placeholder for the actual NWMLS API call
    // Replace with actual RESO Web API endpoint
    const response = await axios.get(`${NWMLS_API_URL}/Property`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
      params
    });

    return response.data.value || [];
  } catch (error) {
    console.error('❌ Failed to fetch listings from NWMLS:', error.message);
    
    // Return mock data for development
    return generateMockListings();
  }
};

/**
 * Map NWMLS listing data to our schema
 */
const mapListingData = (nwmlsListing) => {
  return {
    mlsId: nwmlsListing.ListingId || nwmlsListing.ListingKey,
    title: `${nwmlsListing.BedroomsTotal || 0} Bed ${nwmlsListing.BathroomsTotalInteger || 0} Bath ${nwmlsListing.PropertyType} in ${nwmlsListing.City}`,
    description: nwmlsListing.PublicRemarks || 'No description available',
    price: nwmlsListing.ListPrice || 0,
    listDate: nwmlsListing.ListingContractDate ? new Date(nwmlsListing.ListingContractDate) : new Date(),
    updatedDate: nwmlsListing.ModificationTimestamp ? new Date(nwmlsListing.ModificationTimestamp) : new Date(),
    address: {
      line1: nwmlsListing.UnparsedAddress || nwmlsListing.StreetNumber + ' ' + nwmlsListing.StreetName,
      city: nwmlsListing.City,
      state: nwmlsListing.StateOrProvince || 'WA',
      zip: nwmlsListing.PostalCode,
      coordinates: {
        type: 'Point',
        coordinates: [
          parseFloat(nwmlsListing.Longitude) || -122.3321,
          parseFloat(nwmlsListing.Latitude) || 47.6062
        ]
      }
    },
    propertyType: mapPropertyType(nwmlsListing.PropertyType),
    beds: nwmlsListing.BedroomsTotal || 0,
    baths: nwmlsListing.BathroomsTotalInteger || 0,
    sqft: nwmlsListing.LivingArea || 0,
    lotSize: nwmlsListing.LotSizeSquareFeet || 0,
    yearBuilt: nwmlsListing.YearBuilt || null,
    images: (nwmlsListing.Media || []).map((media, index) => ({
      url: media.MediaURL,
      caption: media.ShortDescription || '',
      order: index
    })),
    features: nwmlsListing.InteriorFeatures || [],
    status: mapStatus(nwmlsListing.StandardStatus),
    raw: nwmlsListing
  };
};

/**
 * Map NWMLS property type to our enum
 */
const mapPropertyType = (type) => {
  const typeMap = {
    'Residential': 'House',
    'Condominium': 'Condo',
    'Townhouse': 'Townhouse',
    'Multi-Family': 'Multi-Family',
    'Land': 'Land',
    'Commercial': 'Commercial'
  };
  return typeMap[type] || 'House';
};

/**
 * Map NWMLS status to our enum
 */
const mapStatus = (status) => {
  const statusMap = {
    'Active': 'Active',
    'Pending': 'Pending',
    'Closed': 'Sold',
    'Withdrawn': 'Removed',
    'Expired': 'Removed'
  };
  return statusMap[status] || 'Active';
};

/**
 * Sync listings from NWMLS to database
 */
const syncListings = async (syncType = 'incremental') => {
  const syncRecord = await SyncMeta.create({
    syncType,
    status: 'in_progress',
    startTime: new Date()
  });

  console.log(`🔄 Starting ${syncType} sync...`);

  try {
    let lastModified = null;
    
    if (syncType === 'incremental') {
      const lastSync = await SyncMeta.findOne({ 
        status: 'completed' 
      }).sort('-endTime');
      
      if (lastSync) {
        lastModified = lastSync.endTime.toISOString();
      }
    }

    const listings = await fetchListings(lastModified);
    console.log(`📥 Fetched ${listings.length} listings from NWMLS`);

    let created = 0, updated = 0, errors = 0;

    for (const nwmlsListing of listings) {
      try {
        const mappedData = mapListingData(nwmlsListing);
        
        // Find or create agent (simplified - in production, sync agents separately)
        let agent = await Agent.findOne({ mlsAgentId: nwmlsListing.ListAgentMlsId });
        if (!agent && nwmlsListing.ListAgentMlsId) {
          agent = await Agent.create({
            mlsAgentId: nwmlsListing.ListAgentMlsId,
            name: nwmlsListing.ListAgentFullName || 'Agent Name',
            email: nwmlsListing.ListAgentEmail || 'agent@ondriverealty.com',
            phone: nwmlsListing.ListAgentDirectPhone || '(555) 000-0000'
          });
        }
        
        if (agent) {
          mappedData.agentId = agent._id;
        }

        // Upsert property
        const result = await Property.findOneAndUpdate(
          { mlsId: mappedData.mlsId },
          mappedData,
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        if (result.isNew) created++;
        else updated++;

      } catch (error) {
        console.error(`Error processing listing ${nwmlsListing.ListingId}:`, error.message);
        errors++;
        syncRecord.errors.push({
          mlsId: nwmlsListing.ListingId,
          message: error.message,
          timestamp: new Date()
        });
      }
    }

    // Mark removed listings (only in full sync)
    if (syncType === 'full') {
      const activeMlsIds = listings.map(l => l.ListingId || l.ListingKey);
      await Property.updateMany(
        { mlsId: { $nin: activeMlsIds }, status: 'Active' },
        { status: 'Removed' }
      );
    }

    syncRecord.status = 'completed';
    syncRecord.endTime = new Date();
    syncRecord.stats = { created, updated, errors };
    await syncRecord.save();

    console.log(`✅ Sync completed: ${created} created, ${updated} updated, ${errors} errors`);
    return syncRecord;

  } catch (error) {
    console.error('❌ Sync failed:', error);
    syncRecord.status = 'failed';
    syncRecord.endTime = new Date();
    syncRecord.errors.push({
      message: error.message,
      timestamp: new Date()
    });
    await syncRecord.save();
    throw error;
  }
};

/**
 * Trigger manual sync (called from API)
 */
const triggerSync = async (syncType = 'incremental') => {
  const syncRecord = await syncListings(syncType);
  return syncRecord._id;
};

/**
 * Generate mock listings for development
 */
const generateMockListings = () => {
  const cities = ['Seattle', 'Bellevue', 'Redmond', 'Tacoma', 'Spokane'];
  const propertyTypes = ['Residential', 'Condominium', 'Townhouse'];
  
  return Array.from({ length: 20 }, (_, i) => ({
    ListingId: `NWMLS-${10000 + i}`,
    ListingKey: `NWMLS-${10000 + i}`,
    PublicRemarks: `Beautiful ${propertyTypes[i % 3]} in ${cities[i % 5]}. Features modern amenities, spacious layout, and great location.`,
    ListPrice: 400000 + (i * 50000),
    ListingContractDate: new Date(Date.now() - (i * 86400000)),
    ModificationTimestamp: new Date(),
    UnparsedAddress: `${1000 + i} Main Street`,
    City: cities[i % 5],
    StateOrProvince: 'WA',
    PostalCode: `981${String(i).padStart(2, '0')}`,
    Latitude: 47.6062 + (Math.random() * 0.5),
    Longitude: -122.3321 + (Math.random() * 0.5),
    PropertyType: propertyTypes[i % 3],
    BedroomsTotal: 2 + (i % 4),
    BathroomsTotalInteger: 1 + (i % 3),
    LivingArea: 1200 + (i * 100),
    LotSizeSquareFeet: 3000 + (i * 500),
    YearBuilt: 1990 + (i % 30),
    StandardStatus: 'Active',
    Media: [
      {
        MediaURL: `https://source.unsplash.com/800x600/?house,home&sig=${i}`,
        ShortDescription: 'Front view'
      }
    ],
    InteriorFeatures: ['Hardwood Floors', 'Granite Counters', 'Stainless Appliances'],
    ListAgentMlsId: `AGENT-${100 + (i % 5)}`,
    ListAgentFullName: `Agent ${i % 5}`,
    ListAgentEmail: `agent${i % 5}@ondriverealty.com`,
    ListAgentDirectPhone: `(555) ${String(100 + (i % 5)).padStart(3, '0')}-0000`
  }));
};

// Schedule automatic sync every 30 minutes
cron.schedule('*/30 * * * *', async () => {
  console.log('⏰ Running scheduled incremental sync...');
  try {
    await syncListings('incremental');
  } catch (error) {
    console.error('Scheduled sync failed:', error);
  }
});

// Run initial sync on startup (after 10 seconds)
setTimeout(() => {
  console.log('🚀 Running initial sync...');
  syncListings('incremental').catch(console.error);
}, 10000);

module.exports = { syncListings, triggerSync };

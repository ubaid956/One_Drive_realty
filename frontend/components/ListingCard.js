import Link from 'next/link';
import Image from 'next/image';
import { FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa';

export default function ListingCard({ listing }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const primaryImage = listing.images && listing.images.length > 0
    ? listing.images[0].url
    : 'https://source.unsplash.com/800x600/?house,home';

  return (
    <Link href={`/listings/${listing._id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
        <div className="relative h-64 w-full">
          <Image
            src={primaryImage}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {listing.featured && (
            <span className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            {listing.status}
          </span>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-900 flex-1">
              {formatPrice(listing.price)}
            </h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {listing.propertyType}
            </span>
          </div>
          
          <p className="text-gray-600 mb-2 line-clamp-2">{listing.title}</p>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <FaMapMarkerAlt className="mr-1" />
            <span>{listing.address.city}, {listing.address.state} {listing.address.zip}</span>
          </div>
          
          <div className="flex items-center justify-between text-gray-600 text-sm pt-3 border-t border-gray-200">
            <div className="flex items-center">
              <FaBed className="mr-1" />
              <span>{listing.beds} Beds</span>
            </div>
            <div className="flex items-center">
              <FaBath className="mr-1" />
              <span>{listing.baths} Baths</span>
            </div>
            {listing.sqft && (
              <div className="flex items-center">
                <FaRuler className="mr-1" />
                <span>{listing.sqft.toLocaleString()} sqft</span>
              </div>
            )}
          </div>

          {listing.agentId && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                Listed by: <span className="font-semibold">{listing.agentId.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

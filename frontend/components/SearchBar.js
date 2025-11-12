import { useState } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ initialValues = {} }) {
  const router = useRouter();
  const [searchParams, setSearchParams] = useState({
    q: initialValues.q || '',
    city: initialValues.city || '',
    minPrice: initialValues.minPrice || '',
    maxPrice: initialValues.maxPrice || '',
    propertyType: initialValues.propertyType || '',
    beds: initialValues.beds || '',
    baths: initialValues.baths || '',
  });

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Build query string
    const query = {};
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) {
        query[key] = searchParams[key];
      }
    });

    router.push({
      pathname: '/listings',
      query
    });
  };

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSearch} className="bg-white p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <input
            type="text"
            name="q"
            placeholder="Search by keyword, city, or address..."
            value={searchParams.q}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* City */}
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={searchParams.city}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Property Type */}
        <div>
          <select
            name="propertyType"
            value={searchParams.propertyType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Multi-Family">Multi-Family</option>
            <option value="Land">Land</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* Min Price */}
        <div>
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={searchParams.minPrice}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Max Price */}
        <div>
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={searchParams.maxPrice}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Beds */}
        <div>
          <select
            name="beds"
            value={searchParams.beds}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any Beds</option>
            <option value="1">1+ Beds</option>
            <option value="2">2+ Beds</option>
            <option value="3">3+ Beds</option>
            <option value="4">4+ Beds</option>
            <option value="5">5+ Beds</option>
          </select>
        </div>

        {/* Baths */}
        <div>
          <select
            name="baths"
            value={searchParams.baths}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Any Baths</option>
            <option value="1">1+ Baths</option>
            <option value="2">2+ Baths</option>
            <option value="3">3+ Baths</option>
            <option value="4">4+ Baths</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          type="submit"
          className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition flex items-center justify-center font-semibold"
        >
          <FaSearch className="mr-2" />
          Search Properties
        </button>
      </div>
    </form>
  );
}

import { useState, useEffect } from 'react';
import { fetchProperties } from '../lib/api';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import ListingCard from '../components/ListingCard';
import Pagination from '../components/Pagination';
import styles from '../styles/ListingPage.module.css';

const ListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    q: '',
    city: '',
    state: '',
    zip: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    propertyType: '',
    page: 1,
    limit: 20,
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchProperties(filters);
      setProperties(result.data);
      setTotalPages(result.meta.pages);
    };

    fetchData();
  }, [filters]);

  const handleSearch = (searchParams) => {
    setFilters({ ...filters, ...searchParams, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
  };

  return (
    <Layout>
      <SearchBar onSearch={handleSearch} />
      <div className={styles.listingsGrid}>
        {properties.map((property) => (
          <ListingCard key={property.id} property={property} />
        ))}
      </div>
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
};

export default ListingsPage;

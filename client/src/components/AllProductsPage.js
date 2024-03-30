import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import Pagination from "./Pagination";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: "",
    company: "",
    rating: "",
    priceRange: "",
    availability: "",
  });

  useEffect(() => {
    const fetchProductsData = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts({ page: currentPage, ...filters });
        setProducts(response.products);
        setTotalPages(response.totalPages);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    setCurrentPage(1);
    setFilters({ ...filters, ...newFilters });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>All Products</h1>
      <Filters onChange={handleFilterChange} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllProductsPage;

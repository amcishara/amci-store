import { useEffect, useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import Product from '../components/Product';
import products from '../products';

const HomeScreen = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [noProductsMessage, setNoProductsMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryFilter = searchParams.get('category');
    const searchFilter = searchParams.get('search');

    let filtered = [...products];

    // Handle search
    if (searchFilter) {
      const searchTerms = searchFilter.toLowerCase().split(' ');
      filtered = filtered.filter(product => {
        const searchString = `${product.name} ${product.brand} ${product.category}`.toLowerCase();
        return searchTerms.every(term => searchString.includes(term));
      });
    }

    // Handle category filtering
    if (categoryFilter) {
      if (categoryFilter === 'All') {
        // Keep all products
      } else if (categoryFilter === 'All in Home') {
        filtered = filtered.filter(product => product.mainCategory === 'Home');
      } else if (categoryFilter === 'Electronics') {
        filtered = filtered.filter(product => product.mainCategory === 'Electronics');
      } else {
        filtered = filtered.filter(product => product.category === categoryFilter);
      }
    }

    setFilteredProducts(filtered);

    if (filtered.length === 0) {
      const message = searchFilter
        ? `No products found matching "${searchFilter}"`
        : `No products found in ${categoryFilter} category. We're working on adding more products!`;
      setNoProductsMessage(message);
    } else {
      setNoProductsMessage('');
    }
  }, [location.search]);

  // Function to get the correct heading text
  const getHeadingText = () => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    if (search) {
      return `Search Results for "${search}"`;
    }

    if (!category) return 'Latest Products';
    
    switch (category) {
      case 'All':
        return 'All Products';
      case 'All in Home':
        return 'All Home Products';
      default:
        return `Products in ${category}`;
    }
  };

  return (
    <>
      <h1>{getHeadingText()}</h1>
      {noProductsMessage ? (
        <Alert variant="info" className="text-center">
          {noProductsMessage}
        </Alert>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;

import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Container, Nav, Form, Button, Badge } from 'react-bootstrap'
import { FaUser, FaShoppingCart, FaSearch, FaBars } from 'react-icons/fa'
import './Header.css' // We'll create this next
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartCount, setCartCount] = useState(0); // Example cart count state
  const [showCategories, setShowCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Categories');
  const categoryRef = useRef(null);

  // Initialize searchTerm from URL if it exists
  const [searchTerm, setSearchTerm] = useState(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('search') || '';
  });

  // Update searchTerm when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search');
    if (searchQuery !== searchTerm) {
      setSearchTerm(searchQuery || '');
    }
  }, [location.search]);

  // Handle URL changes
  useEffect(() => {
    // Clear any existing URL parameters on initial load
    if (window.location.search) {
      navigate('/', { replace: true });
    }
  }, []); // Empty dependency array means this runs once on mount

  const handleCategoryClick = (category) => {
    setShowCategories(false);
    setActiveCategory(null);
    setSelectedCategory(category);
    
    // Update category name from 'Home & Garden' to 'Home'
    if (category === 'All in Home') {
      navigate('/?category=All in Home', { replace: true });
    } else {
      navigate(`/?category=${category}`, { replace: true });
    }
  };

  // Example categories - replace with your actual categories
  const categories = [
    { 
      name: 'Electronics',
      subcategories: []
    },
    { 
      name: 'Home',
      subcategories: [
        'Furniture',
        'Home Decor',
        'Kitchen & Dining',
        'Bedding',
        'Bathroom',
        'Lighting',
        'Garden Tools',
        'Outdoor Furniture',
        'Plants & Seeds'
      ]
    },
    { 
      name: 'Clothing',
      subcategories: []
    },
    { 
      name: 'Sports',
      subcategories: []
    },
    { 
      name: 'Books',
      subcategories: []
    },
    { 
      name: 'Toys',
      subcategories: []
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategories(false);
        setActiveCategory(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${searchTerm.trim()}`);
    } else {
      navigate('/');
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className="py-2 navbar-custom">
        <Container fluid className="px-4">
          <Navbar.Brand href="/" className="brand-logo">
            <span className="brand-text">AMCI-STORE</span>
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="w-100 d-flex justify-content-center">
              <div className="search-wrapper">
                <div className="category-dropdown" ref={categoryRef}>
                  <Button
                    variant="outline-light"
                    className="category-button"
                    onClick={() => setShowCategories(!showCategories)}
                  >
                    <FaBars className="me-2" />
                    {selectedCategory}
                  </Button>
                  {showCategories && (
                    <div className="category-menu">
                      <div className="category-item" onClick={() => handleCategoryClick('All')}>
                        All Categories
                      </div>
                      <div className="category-divider" />
                      {categories.map((category, index) => (
                        <div key={index}>
                          <div
                            className="category-item"
                            onMouseEnter={() => setActiveCategory(category.name)}
                            onClick={() => {
                              // Make categories without subcategories clickable
                              if (category.subcategories.length === 0) {
                                handleCategoryClick(category.name);
                              }
                            }}
                            style={{ 
                              cursor: category.subcategories.length > 0 ? 'default' : 'pointer' 
                            }}
                          >
                            {category.name}
                            {category.subcategories.length > 0 && (
                              <span className="ms-2">›</span>
                            )}
                          </div>
                          {activeCategory === category.name && category.subcategories.length > 0 && (
                            <div className="subcategory-menu">
                              <div 
                                className="category-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCategoryClick(`All in ${category.name}`);
                                }}
                              >
                                All in {category.name}
                              </div>
                              <div className="category-divider" />
                              {category.subcategories.map((subcategory, subIndex) => (
                                <div
                                  key={subIndex}
                                  className="category-item"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCategoryClick(subcategory);
                                  }}
                                >
                                  {subcategory}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <Form onSubmit={handleSearch} className="search-form">
                  <div className="search-wrapper">
                    <Form.Control
                      type="search"
                      placeholder="Search products..."
                      className={`search-input ${windowWidth < 992 ? 'mt-2' : ''}`}
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button 
                      variant="outline-light" 
                      className={`search-button ${windowWidth < 992 ? 'mt-2' : ''}`}
                      type="submit"
                    >
                      <FaSearch />
                    </Button>
                  </div>
                </Form>
              </div>
            </Nav>
            
            <Nav className="nav-buttons">
              <Nav.Link href="/cart" className="nav-link-custom">
                <Button variant="outline-light" className="me-2 nav-button">
                  <FaShoppingCart className="mb-1"/>
                  <span className="ms-1">Cart</span>
                  {cartCount > 0 && (
                    <Badge bg="danger" className="ms-1">{cartCount}</Badge>
                  )}
                </Button>
              </Nav.Link>
              <Nav.Link href="/login" className="nav-link-custom">
                <Button variant="outline-light" className="nav-button">
                  <FaUser className="mb-1"/>
                  <span className="ms-1">Login</span>
                </Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header

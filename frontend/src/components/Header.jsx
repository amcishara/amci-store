import React, { useState, useEffect } from 'react'
import { Navbar, Container, Nav, Form, Button, Badge } from 'react-bootstrap'
import { FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa'
import './Header.css' // We'll create this next

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartCount, setCartCount] = useState(0); // Example cart count state

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
              <Form className="d-flex search-form w-100">
                <div className="search-wrapper">
                  <Form.Control
                    type="search"
                    placeholder="Search products..."
                    className={`search-input ${windowWidth < 992 ? 'mt-2' : ''}`}
                    aria-label="Search"
                  />
                  <Button 
                    variant="outline-light" 
                    className={`search-button ${windowWidth < 992 ? 'mt-2' : ''}`}
                  >
                    <FaSearch />
                  </Button>
                </div>
              </Form>
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

import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'
import './Footer.css'

const Footer = () => {
const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-section">
            <h5>About Us</h5>
            <p className="contact-info">
              AMCI-STORE is your one-stop destination for all your shopping needs. We provide quality products at competitive prices.
            </p>
            <div className="social-links">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-section">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5>Customer Service</h5>
            <ul className="footer-links">
              <li><a href="/shipping">Shipping Policy</a></li>
              <li><a href="/returns">Returns & Refunds</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h5>Contact Info</h5>
            <div className="contact-info">
              <p><FaMapMarkerAlt /> 123 Shopping Street, NY 10001</p>
              <p><FaPhone /> +1 234 567 8900</p>
              <p><FaEnvelope /> support@amcistore.com</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright &copy; {year} AMCI-STORE. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer

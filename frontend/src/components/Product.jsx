import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import './product.css'

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded h-100 shadow-sm hover-effect" >
      <Link to={`/product/${product._id}`} className="text-decoration-none">
        <Card.Img 
          src={product.image} 
          variant="top" 
          className="img-fluid product-image"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
          
          <div className="my-2">
            <Rating 
              value={product.rating} 
              text={`${product.numReviews} reviews`} 
            />
          </div>

          <Card.Text as="h3" className="text-primary mb-0 mt-auto">
            ${product && product.price ? product.price.toFixed(2) : '0.00'}
          </Card.Text>
        </Card.Body>
      </Link>
    </Card>
  )
}

export default Product
 
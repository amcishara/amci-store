import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import './ProductScreen.css';
import { useGetProductDetailsQuery } from '../slices/productApiSlice';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { addToCart } from '../slices/cartSlices';

const ProductScreen = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

 
  const { data: product = {}, error, isLoading } = useGetProductDetailsQuery(id);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    // navigate('/cart');
  }


  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <div className="image-container">
              <Image src={product.image} alt={product.name} fluid className="product-detail-image" />
            </div>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush' className="product-info">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card className="order-card">
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item >
                <ListGroup.Item >
                  {product.countInStock > 0 && (
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <div className='mx-4' style={{ display: 'flex', alignItems: 'center' }}>
                          <Button 
                            
                            variant="outline-dark" 
                            style={{ marginRight: '5px', padding: '5px 10px', borderRadius: '5px' }}
                            onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                          >
                            -
                          </Button>
                          <Form.Control
                          
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                            style={{ width: '60px', textAlign: 'center' }}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                          <Button 
                          
                            variant="outline-dark" 
                            style={{ marginLeft: '5px', padding: '5px 10px', borderRadius: '5px', }}
                            onClick={() => setQty(qty < product.countInStock ? qty + 1 : product.countInStock)}
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  )}
                    
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    
                    Add To Cart
                    
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className='btn-block btn-primary'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Buy It Now
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className='specifications-card'>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                 <h4 style={{ display: 'inline-block', width: 'auto' }}>Specifications</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Brand:</strong> {product.brand}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Category:</strong> {product.category}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Dimensions:</strong> {product.dimensions}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Weight:</strong> {product.weight}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
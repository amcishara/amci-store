import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';
import './ProductScreen.css';

const ProductScreen = () => {
  const { id } = useParams();
  const product = products.find((p) => p._id === id);

  if (!product) {
    return <div>Product Not Found</div>;
  }

  return (
    <div className="product-container">
      <Link className='btn btn-light my-3' to='/'>
        <i className='fas fa-arrow-left'></i> Go Back
      </Link>
      <Row>
        <Col md={5}>
          <div className="image-container">
            <Image src={product.image} alt={product.name} fluid className="product-detail-image" />
          </div>
        </Col>
        <Col md={4}>
          <ListGroup variant='flush' className="product-info">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
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
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <span className={product.countInStock > 0 ? 'text-success' : 'text-danger'}>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <>
                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button 
                        className='btn-block btn-add-to-cart' 
                        type='button'
                      >
                        Add To Cart
                      </Button>
                      <Button 
                        className='btn-block btn-buy-now' 
                        type='button'
                        variant='success'
                      >
                        Buy Now
                      </Button>
                    </div>
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>
          </Card>

          {/* Additional Product Details */}
          <Card className=" additional-info mt-3">
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h5>Product Details</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Brand:</Col>
                  <Col>{product.brand}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Category:</Col>
                  <Col>{product.category}</Col>
                </Row>
              </ListGroup.Item>
              {product.features && (
                <ListGroup.Item>
                  <strong>Key Features:</strong>
                  <ul className="features-list">
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;

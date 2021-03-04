import React from 'react'
import {Link} from 'react-router-dom';
import {
        Row,
        Col,
        Image,
        ListGroup,
        Card,
        Button
    } from 'react-bootstrap'
import Rating from '../components/Rating'; 
import products  from '../products';

const ProductScreen = ({match}) => {
    const product = products.find(p => p._id === match.params.id )
    return (
        <>
            <Link 
                className="btn btn-dark btn-sm my-3" to="/"> Go Back </Link>
            <Row>
                <Col md={6}>
                    <Image 
                        src={product.image} fluid
                        alt={product.name}>
                    </Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <Rating 
                            value={product.rating}
                            text={`${product.numReviews} Reviews `}
                           />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h4><strong>Price :</strong>  $ {product.price} </h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <h4><strong>Description :</strong> {product.description} </h4> 
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <h4><strong>  Price :</strong></h4>
                                        </Col>
                                        <Col>
                                            <h5> $ {product.price} </h5> 
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <h4> <strong> Status : </strong> </h4>
                                        </Col>
                                        <Col>
                                            <h5> {product.countInStock > 0  ? ('In Stock' ) : 'Out Of Stock'}  </h5>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            variant="dark" 
                                            disabled = {product.countInStock === 0}
                                        >
                                            Add to Card
                                        </Button>
                                    </Row> 
                                </ListGroup.Item>
                            </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen

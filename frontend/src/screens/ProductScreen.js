import React, {useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {
        Row,
        Col,
        Image, 
        ListGroup,
        Card,
        Button,
        Collapse,
        Form,
    } 
from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails} from '../actions/productAction'

const ProductScreen = ({history, match}) => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
   
},[dispatch, match])

const addToCardHandler = () =>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
}
const [open, setOpen] = useState(false)

    return (
        <>
            <Link 
                className="btn btn-dark btn-sm my-3" to="/"> <i class="fas fa-arrow-alt-circle-left"></i> Go Back  
            </Link>
                {loading ? <Loader /> : error ? <Message variant="danger">{error} </Message> : (
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
                        <Button
                            className="btn btn-dark btn-lg my-3"
                            onClick={() => setOpen(!open)}
                            aria-controls="description-collapse-text"
                            aria-expanded={open}
                        >
                            Description
                        </Button> 
                        <Collapse in={open}>
                            <div id="description-collapse-text">
                                <h4> {product.description} </h4> 
                            </div>
                            </Collapse> 
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

                                {product.countInStock > 0  && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control 
                                                    as='select'
                                                    size='lg'
                                                    value={qty} 
                                                    onChange={(e) => setQty(e.target.value)}>
                                                    {
                                                        [...Array(product.countInStock).keys()].map((x) => (
                                                            <option 
                                                                key={x + 1} 
                                                                value={x + 1}
                                                            >
                                                                {x + 1}
                                                            </option>
                                                        ))
                                                    }    
                                                </Form.Control> 
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Row>
                                        <Button
                                            className="btn-block"
                                            type="button"
                                            variant="dark" 
                                            disabled = {product.countInStock === 0}
                                            onClick={addToCardHandler}
                                        >
                                            Add to Card
                                        </Button>
                                    </Row> 
                                </ListGroup.Item>
                            </ListGroup>
                    </Card>
                </Col>
            </Row>
        )}
            
    </>
    )
}

export default ProductScreen


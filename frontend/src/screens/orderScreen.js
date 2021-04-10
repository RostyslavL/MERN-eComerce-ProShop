import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/CheckoutSteps'
import {getOrderDetails} from '../actions/orderActions'

const OrderScreen = ({ match }) =>{

    const orderId = match.params.id

    const dispatch = useDispatch()

    const orderDetails = useSelector( state => state.orderDetails)
    const { order, loading, error } = orderDetails

    if(!loading){
    // Calculate prices
        const addDecimalsToPrice = (num) =>{
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimalsToPrice(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }
    useEffect(() => {
        if(!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
        }
    }, [order, orderId, dispatch])
     
    return (
        loading ? 
        <Loader /> : 
        error ? 
        <Message variant='danger'>{error}</Message> : 
        <>
            <h1> Order : {orderId} </h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item >
                        <h2>Shipping</h2>
              <p>
                <strong>Name: &nbsp; </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: &nbsp;</strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:  &nbsp;</strong>
                &nbsp;{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                &nbsp;{order.shippingAddress.postalCode},{' '}
                &nbsp;{order.shippingAddress.country}
              </p>
                    {
                    order.isDelivered 
                        ? 
                        <Message variant='success'> Delivered on {order.deliveredAt}</Message> 
                        : 
                        <Message variant='warning'> <h2>Not Delivered Yet</h2> </Message>
                    }
                        </ListGroup.Item>

                        <ListGroup.Item >
                            <h2> <b>Payment Method &nbsp;</b> </h2>
                            <p>
                                <p>
                                    <strong> Method : 
                                        &nbsp; {order.paymentMethod}
                                    </strong>
                                </p>
                            </p>
                            {
                            order.isPaid 
                                ? 
                                <Message variant='success'> Paid on {order.paidAt}</Message> 
                                : 
                                <Message variant='warning'> <h2>Not Payed Yet</h2> </Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2> <b> Orders </b> </h2>
                                &nbsp;  {order.orderItems.length === 0 ? 
                                <Message> Your Order is Empty </Message> : 
                                (
                                    <ListGroup variant='flush'>
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index} >
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}><b>{item.name}</b></Link>
                                                    </Col>
                                                    <Col md={4}>
                                                      <b>{item.qty} x {item.price} = {item.qty * item.price} $</b> 
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2> <b>Order Summary</b> </h2>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Items </b></Col>
                                    <Col> <b> {order.itemsPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Shipping </b></Col>
                                    <Col> <b> {order.shippingPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Tax </b></Col>
                                    <Col> <b> {order.taxPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item>                            
                            <ListGroup.Item>
                                <Row> 
                                    <Col> <b> Total </b></Col>
                                    <Col> <b> {order.totalPrice} $</b></Col>
                                </Row>
                            </ListGroup.Item>                  
                        </ListGroup>
                    </Card>
                </Col>
           </Row>
         </>
    )
}

export default OrderScreen

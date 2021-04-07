import  {useState} from 'react'
import { Container ,Form, Button, Col,Row  } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = ({ history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod ]= useState('PayPal')
    

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer size="lg" >
            <CheckoutSteps step1 step2 step3/>
            <h1>   <i class="fas fa-money-bill-wave"></i> Payment  </h1>
            <Form onSubmit={submitHandler} >
                <Form.Group style={{ 
                        width: '100%', 
                        backgroundColor: '#fff' ,
                        justifyContent:'center'
                    }}>
                    <Form.Label as='legend'>
                        <h2> Select Method </h2>
                    </Form.Label>
                        <Row>
                            <Col>
                            <h3>    <i className="fab fa-cc-paypal"></i>    </h3>
                                <Form.Check 
                                    type='radio'
                                    label='PayPal or Credit Card'
                                    id='PayPal'
                                    name='paymentMethod'
                                    value='PayPal'
                                    checked
                                    onChange={(e)=> setPaymentMethod(e.target.value)}>
                                </Form.Check>
                            </Col>
                        </Row>
                            <br />  
                        <Row>
                            <Col>
                                    <h3>    <i class="fab fa-cc-stripe"></i>    </h3>
                                {/* Add additional new payment method : */}
                                <Form.Check 
                                    type='radio'
                                    label='Stripe'
                                    id='Stripe'
                                    name='paymentMethod'
                                    value='Stripe'
                                    onChange={(e)=> setPaymentMethod(e.target.value)}> 
                                </Form.Check>
                            </Col>
                        </Row>
                            <br />
                        <Row>
                            <Col>
                                <h3>    <i class="fab fa-google-pay"></i>   </h3>
                                {/* Add additional new payment method : */}
                                <Form.Check 
                                    type='radio'
                                    label='Goopgle Pay'
                                    id='GoopglePay'
                                    name='paymentMethod'
                                    value='GoopglePay'
                                    onChange={(e)=> setPaymentMethod(e.target.value)}> 
                                </Form.Check>
                            </Col>
                        </Row>
                            <br />  
                        <Row>
                            <Col>
                                <h3>    <i class="fab fa-amazon-pay"></i>    </h3>
                                {/* Add additional new payment method : */}
                                <Form.Check 
                                    type='radio'
                                    label='Amazon-Pay'
                                    id='AmazonPay'
                                    name='paymentMethod'
                                    value='AmazonPay'
                                    onChange={(e)=> setPaymentMethod(e.target.value)}> 
                                </Form.Check>
                            </Col>
                        </Row>                    
                            <br />  
                        <Row>
                            <Col>
                                <h3>    <i class="fab fa-cc-mastercard"></i>    </h3>
                                {/* Add additional new payment method : */}
                                <Form.Check 
                                    type='radio'
                                    label='Mastercard'
                                    id='Mastercard'
                                    name='paymentMethod'
                                    value='Mastercard'
                                    onChange={(e)=> setPaymentMethod(e.target.value)}> 
                                </Form.Check>
                            </Col>
                        </Row>                    
                        <Row>
                            <Col>
                                <h3>   <i class="fab fa-apple-pay"></i>    </h3>
                                {/* Add additional new payment method : */}
                                <Form.Check 
                                    type='radio'
                                    label='Apple-Pay'
                                    id='ApplePay'
                                    name='paymentMethod'
                                    value='ApplePay'
                                    onChange={(e)=> setPaymentMethod(e.target.value)}> 
                                </Form.Check>
                            </Col>
                        </Row>                    
                </Form.Group>
                <br />
                <Button type='submit' variant='dark'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen

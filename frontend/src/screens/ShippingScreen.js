import  {useState} from 'react'
import { Form } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import ContinueButton from '../components/ContinueButton'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({ history}) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2/>
            <h1> Shipping </h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                <Form.Label> Address </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Provide your user Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                <Form.Label> City </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Provide your user City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                <Form.Label> Postal Code </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Provide your Postal Code'
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                    ></Form.Control>
                </Form.Group>
                <Form.Group controlId='country'>
                <Form.Label> Country </Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Provide your country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    ></Form.Control>
                </Form.Group>
                    <ContinueButton />
                </Form>
        </FormContainer>
    )
}

export default ShippingScreen

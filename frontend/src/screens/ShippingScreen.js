import  {useState} from 'react'
import { Form, Button } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'

const ShippingScreen = ({ history}) => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log('submitHandler - invoced') // TO DO : DISPATCH ACTION SHIPPING ADDRESS
    }

    return (
        <FormContainer>
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
                <Button type='submit' variant='dark'>
                    Continue
                </Button>
                </Form>
        </FormContainer>
    )
}

export default ShippingScreen

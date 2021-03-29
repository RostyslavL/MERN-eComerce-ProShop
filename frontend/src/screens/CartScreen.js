import React , {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import { 
    Row, 
    Col, 
    Listgroup, 
    Image, 
    Form, 
    Button, 
    Card 
} from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'

const CartScreen = ({ match, location, histoty }) => {

    const productID = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart
    
    console.log(cartItems)

    useEffect(() => {
        if(productID){
            dispatch(addToCart(productID, qty))
        }
    }, [dispatch, productID, qty])

    
    return (
        <div>
            Cart
        </div>
    )
}

export default CartScreen

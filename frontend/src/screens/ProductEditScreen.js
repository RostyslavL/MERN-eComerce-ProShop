import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDeails, updateProduct } from '../actions/productAction'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name,  setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [rating, setRating] = useState(0)
  const [numReviews, setNumReviews] = useState(0)
  const [description, setDescription] = useState('')
  
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

//   const userUpdate = useSelector((state) => state.userUpdate)
//   const {
//     loading: loadingUpdate,
//     error: errorUpdate,
//     success: successUpdate,
//   } = userUpdate

  useEffect(() => {
    
    if (!product.name || product._id !== productId) {
        dispatch(listProductDeails(productId))
    } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setRating(product.rating)
        setNumReviews(product.numReviews)
        setDescription(product.description)
    }
  }, [dispatch, history, productId, product ])

  const submitHandler = (e) => {
    e.preventDefault()
    // Update product
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light btn-sm my-3'>
        <i className="fas fa-arrow-alt-circle-left"> Go Back </i>
      </Link>
      <FormContainer>
      <i className="far fa-edit"><h1>Edit Product</h1></i>
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label><b>Name</b></Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label><b>Price</b></Form.Label>
              <Form.Control
                type='number'
                placeholder='Provide Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
            <Form.Label><b>Image</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label><b>Brand</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label><b>Category</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label><b>Count In Stock</b></Form.Label>
              <Form.Control
                type='number'
                placeholder='Provide Count In Stock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label><b>Rating</b></Form.Label>
              <Form.Control
                type='number'
                placeholder='Provide Rating'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label><b>Description</b></Form.Label>
              <Form.Control
                type='text'
                placeholder='Provide Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button  type='submit' className='btn btn-dark btn-sm' block>
              Update
           </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
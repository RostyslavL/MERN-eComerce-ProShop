import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {
    Form, 
    Button, 
} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    
    const dispatch = useDispatch()
    const userDetails = useSelector( state => state.userDetails)
    const { loading, error, user } = userDetails

    useEffect(() =>{
        if(!user.name || user._id !== userId){
            dispatch(getUserDetails(userId))
        }else{
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [dispatch, user, userId])
    
    const submitHandler = (e) =>{
        e.preventDefault()        
    }

return (
    <>
    <Link to='/admin/userlist' className="btn btn-loght btn-sm my-3" > 
        <i className="fas fa-arrow-alt-circle-left"> Go Back </i>
    </Link>
    <FormContainer>
      <h1>Edit User</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label> <b>Name</b> </Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label> <b>Email Address</b> </Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          <Button variant='dark' className='btn-sm' block>
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  </>
)
}

export default UserEditScreen

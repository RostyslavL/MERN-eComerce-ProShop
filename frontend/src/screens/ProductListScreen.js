import React, { useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listProducts} from '../actions/productAction'

const ProductListScreen = ({history, match}) => {

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() =>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())            
        }else{
            history.push('/login')
        }   
    }, [dispatch, history,userInfo])

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure ?')){
            // delete products 
        }
    }
    const createProductHandler = (product) =>{
        console.log('createProductHandler - invoced')
    }

    return (
        <>
        <Row className='align-item-center'>
            <Col>
                <h1> <b>Products</b> </h1>
            </Col>
            <Col className='text-right'>
                <Button 
                    className='btn btn-md btn-light my-3' 
                    onClick={createProductHandler} > 
                        <i className='fas fa-plus'> 
                            <b> Create Product </b> 
                        </i> 
                </Button>
            </Col>
        </Row>            
            {
                loading ? 
                <Loader/> : 
                error ? 
                <Message variant='danger'>{error}</Message> : (
                    <Table striped bordered hover responsive className='table-sm' variant='dark'>
                        <thead>
                            <tr>
                                <th><h5>ID</h5></th>
                                <th><h5>NAME</h5></th>
                                <th><h5>PRICE</h5></th>
                                <th><h5>CATEGORY</h5></th>
                                <th><h5>BRAND</h5></th>
                                <th><h5>ACTIONS</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product =>
                                <tr key={product._id}>
                                    <td><h6>{product._id}</h6></td>
                                    <td><h6>{product.name}</h6></td>
                                    <td><h6>${product.price}</h6></td>
                                    <td><h6>{product.category}</h6></td>
                                    <td><h6>{product.brand}</h6></td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className="fas fa-user-edit"> Edit </i>
                                            </Button>
                                        </LinkContainer>
                                            <> &nbsp; </>
                                        <Button 
                                            variant='danger' 
                                            className='btn-sm' 
                                            onClick={()=>{deleteHandler(product._id)}}> 
                                                <i className='fas fa-trash'> Delete </i>
                                        </Button>
                                    </td>
                                </tr>
                                )}
                        </tbody>
                    </Table>
                )
            }
        </>
    )
}

export default ProductListScreen

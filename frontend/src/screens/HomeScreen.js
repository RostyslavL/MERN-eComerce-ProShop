import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { Row , Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productAction'

const HomeScreen = () => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        dispatch(listProducts())
    },[dispatch])


    return (
        <>
          <h1>Latest Products</h1>
          {loading ? 
          (<Loader />)
          : error ?
          ( <Message variant="danger">{error}</Message>) : (
             
             <Row>
                {products.map((product)=>(
                    <Col
                        key={product._id}
                        sm={8}
                        md={6}
                        lg={3}
                        xlg={2}
                        >
                        <h3>{product.name}</h3>
                            <Product product={product}/>
                    </Col>
                ))}
            </Row>
          )}
            
        </>
    )
}

export default HomeScreen
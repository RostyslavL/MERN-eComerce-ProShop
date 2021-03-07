import React, {useState, useEffect} from 'react'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import Product from '../components/Product'

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProduts = async () =>{
            const {data }= await axios.get('/api/products')
            setProducts(data)
        }
        fetchProduts()
    },[])
    return (
        <>
          <h1>Latest Products</h1>
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
        </>
    )
}

export default HomeScreen

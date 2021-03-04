import React from 'react'
import { Row } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import products from '../products'
import Product from '../components/Product'

const HomeScreen = () => {
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

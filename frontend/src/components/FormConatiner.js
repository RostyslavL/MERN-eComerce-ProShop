import React from 'react'
import {Container, Row, Col} from 'react-bootstrap'

const FormConatiner = ({ children }) => {
    return (
        <Container>
            <Row className='justify-contend-md-center'>
                <Col xl={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormConatiner

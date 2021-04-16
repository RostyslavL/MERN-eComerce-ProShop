import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'

const SearchBox = ({history}) => {

    const [keyword, setKeyword] = useState('')
    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                className='mr-sm-2 ml-sm-5' 
                type='text' 
                name='q' 
                onChange = {(e) => setKeyword(e.target.value)} 
                placeholder='Search products...'>
                    <Button 
                        type='submin' 
                        variant='outline-light' 
                        className='p-2'> 
                            Search 
                        </Button>
            </Form.Control>
        </Form>
    )
}

export default SearchBox

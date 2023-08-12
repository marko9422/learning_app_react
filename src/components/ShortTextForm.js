import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './ShortTextForm.css';
// bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ShortTextForm() {

  const [inputs, setInputs] = useState({})

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]:value }))
}

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post("http://localhost/learning_app_react_php/", inputs).then(function(response){
        console.log(response.data)
    });
  }

  return (
    
    <div className='form'>

      <h1>Create short text.</h1>

      <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3"  >
              <Form.Control placeholder='GERMAN' onChange={handleChange} type="text" name='germanShortText' autoComplete="off"/>
          </Form.Group>

          <Form.Group className="mb-3"  >
              <Form.Control placeholder='ENGLISH' onChange={handleChange} type="text" name='englishShortText' autoComplete="off"/>
          </Form.Group>
              
          <Button variant="primary" type="submit">Submit</Button>
      </Form> 

    </div>
  )
}

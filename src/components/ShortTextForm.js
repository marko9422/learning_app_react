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
    // FILL THE TEXT ALLERT IF IS IMPUT EMPTY.
    if (!inputs.englishShortText || !inputs.germanShortText) {
      alert('Please fill in the text.');
      return;
    }
    // POST DATA INTO PHP URL.
    axios.post("http://localhost/learning_app_react_php/", inputs).then(function(response){
        console.log(response.data)

        setInputs({});
    });
    
  }

  return (
    
    <div className='form'>

      <h1>Create short text.</h1>

      <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3"  >
              <Form.Control value={inputs.englishShortText || ''} placeholder='ENGLISH' onChange={handleChange} type="text" name='englishShortText' autoComplete="off"/>
          </Form.Group>
              
          <Form.Group className="mb-3"  >
              <Form.Control value={inputs.germanShortText || ''} placeholder='GERMAN' onChange={handleChange} type="text" name='germanShortText' autoComplete="off"/>
          </Form.Group>

          <Button variant="primary" type="submit">Submit</Button>
      </Form> 

    </div>
  )
}

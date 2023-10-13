import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import './ShortTextForm.css';
// bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ShortTextForm() {

  const [inputs, setInputs] = useState({})
  const [categories,setCategories] = useState([])
  const [categoryInput, setCategoryInput] = useState('')
  
  // GET ALL DATA FROM SQL DATABASE.
  const AllCategoriesSet = new Set();
  
    useEffect(() => {
      getData()
    }, []);

  const getData = async () => {
    await axios.get('http://localhost/learning_app_react_php/').then(function(response){
      response.data.map((one) => {
        AllCategoriesSet.add(one['categoryInput']);
      });
      const SetToArray = Array.from(AllCategoriesSet);
      setCategories(SetToArray)
  })
}  





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

  // ADD CATEGORY INTO.

  // const addCategory = () => {
  //   // setOfCaterories.add(categoryInput);
  //   setCategoryInput('');
  // }
  // const handleCategoryChange = (e) => {
  //   setCategoryInput(e.target.value); 
  // }

  return (
    
    <div className='form'>

      <h1>ADD WORDS</h1>

      <Form onSubmit={handleSubmit} >
          <Form.Group className="mb-3"  >
              <Form.Control value={inputs.englishShortText || ''} placeholder='ENGLISH' onChange={handleChange} type="text" name='englishShortText' autoComplete="off"/>
          </Form.Group>
              
          <Form.Group className="mb-3"  >
              <Form.Control value={inputs.germanShortText || ''} placeholder='GERMAN' onChange={handleChange} type="text" name='germanShortText' autoComplete="off"/>
          </Form.Group>


          {categories.map((oneCategory) => (
             <Form.Check 
                inline
                type={'radio'}
                id={oneCategory}
                label={oneCategory}
                // onChange={handleCategoryChange}
                // defaultChecked={true}
                name="category"
                key={oneCategory}
                value={categoryInput}
           />
           ))}
          <Form.Group className="mb-3">
              <Form.Control value={inputs.categoryInput || ''} placeholder='NEW CATEGORY' onChange={handleChange} type="text" name='categoryInput' autoComplete="off"/>
          </Form.Group>

          <Button variant="primary" type="submit">Submit</Button>

      </Form> 


      

    </div>
  )
}

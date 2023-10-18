import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import './ShortTextForm.css';
// bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ShortTextForm() {

  const [categoryInputs, setCategoryInputs] = useState({})
  const [categoriesData,setCategoriesData] = useState([])
  const [inputs, setInputs] = useState({ 
    radio: categoriesData.lastIndexOf,
  });

  // ON LOAD WEB ,SET DEFAULT RADIO VALUE AS LAST ADDED CATEGORY.
  useEffect(() => {
    if (categoriesData.length > 0) {
      setInputs((prevInputs) => ({
        ...prevInputs,
        radio: categoriesData[categoriesData.length - 1].categoryValue,
      }));
    }
  }, [categoriesData]);
  
  
  // GET ALL CATEGORIES DATA FROM SQL DATABASE.
  
    useEffect(() => {
      getData()
    }, []);

  const getData = async () => {
    await axios.get('http://localhost/learning_app_react_php/get_all_categories.php').then(function(response){
      setCategoriesData(response.data)
  })
}  

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({...values, [name]:value }))
}

  const handleCategoryChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCategoryInputs(values => ({...values, [name]:value }))
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

  const handleCategorSubmit = (e) =>{
    e.preventDefault();
    if (!categoryInputs.categoryValue) {
      alert('Please fill in CATEGORY text.');
      return;
    }
    axios.post("http://localhost/learning_app_react_php/get_all_categories.php", categoryInputs).then(function(response){
        console.log(response.data)
        setCategoryInputs({});
        getData(); 
      });
    
  }

  const handleRadioChange = (value) => {
    setInputs({
      ...inputs,
      radio: value,
    });
  }

  
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


          {categoriesData.map((oneCategory) => (
            <Form.Check
              inline
              type={'radio'}
              id={oneCategory['categoryValue']}
              label={oneCategory['categoryValue']}
              checked={
                inputs.radio === oneCategory['categoryValue']
              }
              onChange={() => handleRadioChange(oneCategory['categoryValue'])}
              name="category"
              key={oneCategory['categoryValue']}
              value={oneCategory['categoryValue']}
            />
      ))}

          <Button variant="primary" type="submit">Submit</Button>

      </Form> 

      <Form onSubmit={handleCategorSubmit} > 
          <Form.Group className="mb-3">
              <Form.Control value={categoryInputs.categoryValue || ''} placeholder='NEW CATEGORY' onChange={handleCategoryChange} type="text" name='categoryValue' autoComplete="off"/>
          </Form.Group>

          <Button variant="secondary" type="submit">Add new category</Button>
      </Form> 
      

    </div>
  )
}

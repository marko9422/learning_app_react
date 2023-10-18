import axios from 'axios';
import React from 'react';
import {useState,useEffect } from 'react';
import './ListWords.css';

// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck,faCircleXmark,faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function ListWords() {
    const [users, setUsers] = useState([]) 
    const [hidenLanguage, setHiddenLanguage] = useState('English')
    const [numberOfListedWords, setNumberOfListedWords] = useState(users.length)
    const [categoriesData,setCategoriesData] = useState([])
    const [choosedCategory, setChoosedCategory] = useState({radio:'general'});

    async function getUsers(e){
        e.preventDefault()
      await axios.get('http://localhost/learning_app_react_php/').then(function(response){
          setUsers(response.data)
      })
    }

    function unhideWord(event){
      const paragraph = event.target;
      paragraph.classList.remove('hiddenWord');
    }

    async function listAll(e){
      e.preventDefault()
      await axios.get('http://localhost/learning_app_react_php/').then(function(response){
        setUsers(response.data)
        setNumberOfListedWords(30000000)
    })
  }
  // Get r
    const randomWords = users.sort(() => Math.random() - 0.5).slice(0, numberOfListedWords);
    
    // WRONG CORRECT HANDLERS. 
    function correct_english(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/correct_english_word.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }
    function wrong_english(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/wrong_english_word.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }
    function correct_german(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/correct_german_word.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }
    function wrong_german(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/wrong_german_word.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }
    // OnClick DISABLE CLICK AGAIN.
    function handle_clicked(e){
      e.preventDefault();
      const icon  = e.target;
      const grandParentDiv = icon.closest('.correct_wrong_wrap');

      if (grandParentDiv) {
        grandParentDiv.classList.add('correct_wrong_clicked');
      }
    }
    // OnClick DISABLE CLICK AGAIN.
    function handle_clicked_showAgain(e){
      e.preventDefault();
      const icon  = e.target;
      const grandParentDiv = icon.closest('.eye-slash-icon');

      if (grandParentDiv) {
        grandParentDiv.classList.add('correct_wrong_clicked');
      }
    }

    function doNotShowAgain(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/doNotShowAgainButton.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }
    // ON LOAD WEB ,SET DEFAULT RADIO VALUE AS LAST ADDED CATEGORY.
    useEffect(() => {
      if (choosedCategory.length > 0) {
        setChoosedCategory({ratio:'general'})
      };}
  , [choosedCategory]);

    // GET ALL CATEGORIES DATA FROM SQL DATABASE.
    useEffect(() => {
      getData()
    }, []);
  
    const getData = async () => {
      await axios.get('http://localhost/learning_app_react_php/get_all_categories.php').then(function(response){
        setCategoriesData(response.data)
    })
  }  


  const handleRadioChange = (value) => {
    setChoosedCategory({
      ...choosedCategory,
      radio: value,
    });
  }


  return (
    <div>
      
      <Form onSubmit={getUsers} >
          <Form.Group className="mb-3">
            <Form.Label htmlFor="disabledSelect">Choose hidden language.</Form.Label>
            <Form.Select 
              id="disabledSelect"
              value={hidenLanguage}
              onChange={(e) => setHiddenLanguage(e.target.value)}>
              <option value="English">English</option>
              <option value="German">German</option>
            </Form.Select>
            <Form.Control 
              placeholder='Number of listed words.'
              onChange={(e) => setNumberOfListedWords(e.target.value)}
              type="text" 
              autoComplete="off"/>
          </Form.Group>
              
          <Button variant="primary" type="submit">Submit</Button>
      </Form> 

      <Button variant="primary" onClick={listAll}>List all</Button>

      
      {categoriesData.map((oneCategory) => (
            <Form.Check
              inline
              type={'radio'}
              id={oneCategory['categoryValue']}
              label={oneCategory['categoryValue']}
              checked={
                choosedCategory.radio === oneCategory['categoryValue']
              }
              onChange={() => handleRadioChange(oneCategory['categoryValue'])}
              name="category"
              key={oneCategory['categoryValue']}
              value={oneCategory['categoryValue']}
            />
        ))
        }
        <Form.Check
              inline
              type={'radio'}
              id={'all categories'}
              label={'all categories'}
              onChange={() => handleRadioChange('general')}
              checked={
                choosedCategory.radio === 'general'
              }
              name="category"
              key={'genenral'}
              value={'genenral'}
            />

        {randomWords.map((user) =>{ 
          if (user.visible === 0 && (user.categoryInput === choosedCategory.radio || choosedCategory.radio === 'general')) {

            return  <div id={user.id} className='' key={user.id}>
                  <div className='oneWord'>
                    {hidenLanguage === 'English' ? (
                      <>
                      <p onClick={unhideWord} className="ListedShortWord ">{user.german}</p>
                      <p onClick={unhideWord} className="ListedShortWord hiddenWord">{user.english}</p> 
                      <div className='correct_wrong_wrap'>
                      <FontAwesomeIcon 
                        className='fontAwesome correct' 
                        icon={faCircleCheck} 
                        onClick={(e) => {correct_english(user.id, e);
                          handle_clicked(e)}} />
                      <FontAwesomeIcon 
                        className='fontAwesome wrong' 
                        icon={faCircleXmark} 
                        onClick={(e) => {wrong_english(user.id, e);
                          handle_clicked(e)}} />
                       <FontAwesomeIcon 
                        icon={faEyeSlash}
                        className='eye-slash-icon' 
                        onClick={(e) => {handle_clicked_showAgain(e);doNotShowAgain(user.id,e)}}/>
                      </div>
                      </>
                    ) : (
                      <>
                      <p onClick={unhideWord} className="ListedShortWord ">{user.english}</p>
                      <p onClick={unhideWord} className="ListedShortWord hiddenWord">{user.german}</p>
                      <div className='correct_wrong_wrap'>
                      <FontAwesomeIcon 
                        className='fontAwesome correct' 
                        icon={faCircleCheck} 
                        onClick={(e) => {correct_german(user.id, e);
                          handle_clicked(e)}} />
                      <FontAwesomeIcon 
                        className='fontAwesome wrong' 
                        icon={faCircleXmark} 
                        onClick={(e) => {wrong_german(user.id, e);
                          handle_clicked(e)}} />
                         <FontAwesomeIcon 
                        icon={faEyeSlash}
                        className='eye-slash-icon' 
                        onClick={(e) => {handle_clicked_showAgain(e);doNotShowAgain(user.id,e)}}/>
                      </div>
                      </>
                    )}
                  </div>

                </div>
                }
              }
        )}



    </div>
)
}

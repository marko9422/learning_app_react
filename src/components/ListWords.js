import axios from 'axios';
import React from 'react';
import {useState } from 'react';
import './ListWords.css';
// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function ListWords() {
    const [users, setUsers] = useState([]) 
    const [hidenLanguage, setHiddenLanguage] = useState('English')
    const [numberOfListedWords, setNumberOfListedWords] = useState(users.length)

    async function getUsers(e){
        e.preventDefault()
      await axios.get('http://localhost/learning_app_react_php/').then(function(response){
          setUsers(response.data)
          // console.log(response.data);
          // console.log(hidenLanguage);
          // console.log(numberOfListedWords);
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
    const randomUsers = users.sort(() => Math.random() - 0.5).slice(0, numberOfListedWords);
    
    // Wrong Correct handlers. 
    function correct(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/correct_word.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }
    function wrong(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/wrong_word.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
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

        {randomUsers.map((user) =>{ 
          
          return  <div id={user.id} className='' key={user.id}>
                  <div className='oneWord'>
                    {hidenLanguage === 'English' ? (
                      <>
                      <p onClick={unhideWord} className="ListedShortWord ">{user.german}</p>
                      <p onClick={unhideWord} className="ListedShortWord hiddenWord">{user.english}</p> 
                      <FontAwesomeIcon icon={faCircleCheck} onClick={(e) => correct(user.id, e)} />
                      <FontAwesomeIcon icon={faCircleXmark} onClick={(e) => wrong(user.id, e)} />
                      </>
                    ) : (
                      <>
                      <p onClick={unhideWord} className="ListedShortWord ">{user.english}</p>
                      <p onClick={unhideWord} className="ListedShortWord hiddenWord">{user.german}</p>
                      </>
                    )}
                  </div>

                </div>}
        )}




    </div>
)
}

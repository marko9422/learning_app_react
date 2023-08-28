import React from 'react';
import {useState } from 'react';
import './ListGrammar.css';
import axios from 'axios';
import parse from 'html-react-parser';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function ListGrammar () {

    const [grammar, setGrammar] = useState([]) 

    async function get_list_data(e){
        e.preventDefault()
        await axios.get('http://localhost/learning_app_react_php/get_grammar.php').then(function(response){
        setGrammar(response.data)
  
      })
    }

    // Wrong Correct handlers. 
    function correct(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/correct_word_long.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }
    function wrong(id, e) {
      e.preventDefault();
      axios.post("http://localhost/learning_app_react_php/wrong_word_long.php", { id: id })
        .then(function(response) {
          console.log(response.data);
        })
    }

    // Handle unhide correct ansfer.
    function unhideGrammar(event) {
      const clickedElement = event.currentTarget;
      clickedElement.classList.remove("hiddenGrammar");
    }

  return (
    <div>

        <Button onClick={get_list_data} variant="primary" type="submit">Submit</Button>

        {grammar.map((user) =>{  
            return  <div  
            id={user.id} className='oneGrammar' key={user.id}>
              <div className="ListedQuestion ">{user.question}</div>
              <FontAwesomeIcon icon={faCircleCheck} onClick={(e) => correct(user.id, e)} />
              <FontAwesomeIcon icon={faCircleXmark} onClick={(e) => wrong(user.id, e)} />
              <div onClick={unhideGrammar} className="ListedText hiddenGrammar">{parse(user.text_data)}</div>
            </div>}
            )}
    </div>

    )
}

import React from 'react';
import {useState } from 'react';
import './ListGrammar.css';
import axios from 'axios';
import parse from 'html-react-parser';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'

export default function ListGrammar () {

    const [grammar, setGrammar] = useState([]) 
    const [numberOfListedWords, setNumberOfListedWords] = useState(grammar.length)

    async function get_list_data(e){
        e.preventDefault()
        await axios.get('http://localhost/learning_app_react_php/get_grammar.php').then(function(response){
        setGrammar(response.data)
  
      })
    }

    // Random grammar.
    const randomGrammar = grammar.sort(() => Math.random() - 0.5).slice(0, numberOfListedWords);


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
     // OnClick disable click again.
     function handle_clicked(e){
      e.preventDefault();
      const icon  = e.target;
      const grandParentDiv = icon.closest('.correct_wrong_wrap');

      if (grandParentDiv) {
        grandParentDiv.classList.add('correct_wrong_clicked');
      }
    }

  return (
    <div>
        <Form.Control 
              placeholder='Number of listed words.'
              onChange={(e) => setNumberOfListedWords(e.target.value)}
              type="text" 
              autoComplete="off"/>
        <Button onClick={get_list_data} variant="primary" type="submit">Submit</Button>

        {randomGrammar.map((user) =>{  
            return  <div  
            id={user.id} className='oneGrammar' key={user.id}>
              <div className="ListedQuestion ">{user.question}</div>
              <div className='correct_wrong_wrap'>
                <FontAwesomeIcon 
                  className='fontAwesome correct' 
                  icon={faCircleCheck} 
                  onClick={(e) => {correct(user.id, e);
                    handle_clicked(e)}} />
                <FontAwesomeIcon 
                  className='fontAwesome wrong' 
                  icon={faCircleXmark} 
                  onClick={(e) => {wrong(user.id, e);
                    handle_clicked(e)}} />
              </div>
              <div onClick={unhideGrammar} className="ListedText hiddenGrammar">{parse(user.text_data)}</div>
            </div>}
            )}
    </div>

    )
}

import React from 'react'
import axios from 'axios';
import {useState } from 'react';
import './ListMistakes.css'

import parse from 'html-react-parser';

// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'


export default function ListMistakes() {

    const [numberOfListedWords, setNumberOfListedWords] = useState(3000000)
    const [mistakes_words, setMistakes_words] = useState([])
    const [mistakes_grammar, setMistakes_grammar] = useState([])
    
    // Get data from database.
    async function list_words(e){
        e.preventDefault()
        await axios.get('http://localhost/learning_app_react_php/list_mistakes_words.php').then(function(response){
            setMistakes_words(response.data)
            setMistakes_grammar([])
            // console.log(response.data[1]['english_score'])

            
      })
    }
    async function list_grammar(e){
        e.preventDefault()
        await axios.get('http://localhost/learning_app_react_php/list_mistakes_grammar.php').then(function(response){
            setMistakes_grammar(response.data)
            setMistakes_words([])
        })
        
    }

    // Sort by score.
    const sorted_words = mistakes_words.sort((a, b) => a.english_score - b.english_score)
    const sorted_grammar = mistakes_grammar.sort((a, b) => a.score - b.score)

    // On click unhide word. The same functions is in the ListWord component.
    function unhideWord(event){
        const paragraph = event.target;
        paragraph.classList.remove('hiddenWord');
      }

    // Handle unhide correct answer in grammar component.
    function unhideGrammar(event) {
        const clickedElement = event.currentTarget;
        clickedElement.classList.remove("hiddenGrammar");
      }

    // Wrong Correct handlers. The same functions is in the ListWord component.
    // handle words.
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
    // Handle grammar.
    function correct_grammar(id, e) {
        e.preventDefault();
        axios.post("http://localhost/learning_app_react_php/correct_word_long.php", { id: id })
            .then(function(response) {
            console.log(response.data);
            })
        }
    function wrong_grammar(id, e) {
    e.preventDefault();
    axios.post("http://localhost/learning_app_react_php/wrong_word_long.php", { id: id })
        .then(function(response) {
        console.log(response.data);
        })
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

  return (<>
    <Button variant="primary" onClick={list_words}>Lisaat Words</Button>

    {/* <Button variant="primary" onClick={list_words}>List Words</Button> */}
    <Button variant="primary" onClick={list_grammar}>List Grammar</Button>
    <Form.Control 
        placeholder='Numbers.'
        onChange={(e) => setNumberOfListedWords(e.target.value)}
        type="text" 
        autoComplete="off"/>

    { sorted_words.slice(0, numberOfListedWords).map((word) => {
        return <div 
        className='oneWord'>
            <p onClick={unhideWord} className="ListedShortWord ">{word.german}</p>
            <p onClick={unhideWord} className="ListedShortWord hiddenWord">{word.english}</p>
            <div className='correct_wrong_wrap'>
                <FontAwesomeIcon 
                className='fontAwesome correct' 
                icon={faCircleCheck} 
                onClick={(e) => {correct(word.id, e);
                    handle_clicked(e)}} />
                <FontAwesomeIcon 
                className='fontAwesome wrong' 
                icon={faCircleXmark} 
                onClick={(e) => {wrong(word.id, e);
                    handle_clicked(e)}} />
            </div>
        </div>

    })}
    { sorted_grammar.slice(0, numberOfListedWords).map((grammar) => {
        return <div  
        id={grammar.id} className='oneGrammar' key={grammar.id}>
          <div className="ListedQuestion ">{grammar.question}</div>
          <div className='correct_wrong_wrap'>
            <FontAwesomeIcon 
            className='fontAwesome correct' 
            icon={faCircleCheck} 
            onClick={(e) => {correct_grammar(grammar.id, e);
                handle_clicked(e)}} />
            <FontAwesomeIcon 
            className='fontAwesome wrong' 
            icon={faCircleXmark} 
            onClick={(e) => {wrong_grammar(grammar.id, e);
                handle_clicked(e)}} />
        </div>
          <div onClick={unhideGrammar} className="ListedText hiddenGrammar">{parse(grammar.text_data)}</div>
        </div>

    })}
    </>
  )
}

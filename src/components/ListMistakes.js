import React from 'react'
import axios from 'axios';
import {useState } from 'react';
import './ListMistakes.css'

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
    const [hidenLanguage, setHiddenLanguage] = useState('English')

    
    // Get data from database.
    async function list_words(e){
        e.preventDefault()
        await axios.get('http://localhost/learning_app_react_php/list_mistakes_words.php').then(function(response){
            setMistakes_words(response.data)
            setMistakes_grammar([])
      })
    }
    async function list_grammar(e){
        e.preventDefault()
        await axios.get('http://localhost/learning_app_react_php/list_mistakes_grammar.php').then(function(response){
            setMistakes_grammar(response.data)
            setMistakes_words([])
        })
    }

    // SORT BY SCORE THAN PUST SORTED SCORES INTO sorted_words_english/german.
    const sorted_words_english = []
    const sorted_words_german = []
    mistakes_words.sort((a, b) => a.english_score - b.english_score);
    sorted_words_english.push(...mistakes_words);
    mistakes_words.sort((a, b) => a.german_score - b.german_score);
    sorted_words_german.push(...mistakes_words);

    // const sorted_grammar = mistakes_grammar.sort((a, b) => a.score - b.score)

    // On click unhide word. The same functions is in the ListWord component.
    function unhideWord(event){
        const paragraph = event.target;
        paragraph.classList.remove('hiddenWord');
      }

    // Handle unhide correct answer in grammar component.
    // function unhideGrammar(event) {
    //     const clickedElement = event.currentTarget;
    //     clickedElement.classList.remove("hiddenGrammar");
    //   }

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
    // HANDLE GRAMMAR.
    // function correct_grammar(id, e) {
    //     e.preventDefault();
    //     axios.post("http://localhost/learning_app_react_php/correct_word_long.php", { id: id })
    //         .then(function(response) {
    //         console.log(response.data);
    //         })
    //     }
    // function wrong_grammar(id, e) {
    // e.preventDefault();
    // axios.post("http://localhost/learning_app_react_php/wrong_word_long.php", { id: id })
    //     .then(function(response) {
    //     console.log(response.data);
    //     })
    // }
    
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
    <Form.Select 
        id="disabledSelect"
        value={hidenLanguage}
        onChange={(e) => setHiddenLanguage(e.target.value)}>
        <option value="English">English</option>
        <option value="German">German</option>
    </Form.Select>
    <Button variant="primary" onClick={list_words}>List Words</Button>

    <Button variant="primary" onClick={list_grammar}>List Grammar</Button>
    <Form.Control 
        placeholder='Numbers.'
        onChange={(e) => setNumberOfListedWords(e.target.value)}
        type="text" 
        autoComplete="off"/>

{hidenLanguage === 'English' ? (
    sorted_words_english.slice(0, numberOfListedWords).map((word) => (
        <div className='oneWord' key={word.id}>
            <p onClick={unhideWord} className="ListedShortWord ">{word.german}</p>
            <p onClick={unhideWord} className="ListedShortWord hiddenWord">{word.english}</p>
            <div className='correct_wrong_wrap'>
                <FontAwesomeIcon 
                    className='fontAwesome correct' 
                    icon={faCircleCheck} 
                    onClick={(e) => {
                        correct_english(word.id, e);
                        handle_clicked(e);
                    }}
                />
                <FontAwesomeIcon 
                    className='fontAwesome wrong' 
                    icon={faCircleXmark} 
                    onClick={(e) => {
                        wrong_english(word.id, e);
                        handle_clicked(e);
                    }}
                />
            </div>
        </div>
    ))
) : (
    sorted_words_german.slice(0, numberOfListedWords).map((word) => (
        <div className='oneWord' key={word.id}>
            <p onClick={unhideWord} className="ListedShortWord ">{word.english}</p>
            <p onClick={unhideWord} className="ListedShortWord hiddenWord">{word.german}</p>
            <div className='correct_wrong_wrap'>
                <FontAwesomeIcon 
                    className='fontAwesome correct' 
                    icon={faCircleCheck} 
                    onClick={(e) => {
                        correct_german(word.id, e);
                        handle_clicked(e);
                    }}
                />
                <FontAwesomeIcon 
                    className='fontAwesome wrong' 
                    icon={faCircleXmark} 
                    onClick={(e) => {
                        wrong_german(word.id, e);
                        handle_clicked(e);
                    }}
                />
            </div>
        </div>
    ))
)}
    </>
  )
}

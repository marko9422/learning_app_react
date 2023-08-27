import React from 'react'
import axios from 'axios';
import {useState } from 'react';
import './ListMistakes.css'

// bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function ListMistakes() {

    const [numberOfListedWords, setNumberOfListedWords] = useState(3)
    const [mistakes_words, setMistakes_words] = useState([])
    const [mistakes_grammar, setMistakes_grammar] = useState([])

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
    // Sort by score.
    const sorted_words = mistakes_words.sort((a, b) => a.score - b.score)
    const sorted_grammar = mistakes_grammar.sort((a, b) => a.score - b.score)

  return (<>

    <Button variant="primary" onClick={list_words}>List Words</Button>
    <Button variant="primary" onClick={list_grammar}>List Grammar</Button>
    <Form.Control 
        placeholder='Numbers.'
        onChange={(e) => setNumberOfListedWords(e.target.value)}
        type="text" 
        autoComplete="off"/>

    { sorted_words.slice(0, 5).map((word) => {
        return <p key={word.id}>{word.score}</p>

    })}
    { sorted_grammar.slice(0, 5).map((grammar) => {
        return <p key={grammar.id}>{grammar.score}</p>

    })}

    </>
  )
}

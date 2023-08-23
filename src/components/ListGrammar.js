import React from 'react';
import {useState } from 'react';
import './ListGrammar.css';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

export default function ListGrammar () {

    const [grammar, setGrammar] = useState([]) 

    async function get_list_data(e){
        e.preventDefault()
        await axios.get('http://localhost/learning_app_react_php/get_grammar.php').then(function(response){
        setGrammar(response.data)
  
      })
    }

  return (
    <div>

        <Button onClick={get_list_data} variant="primary" type="submit">Submit</Button>


        {grammar.map((user) =>{  
            return  <div id={user.id} className='' key={user.id}>
            
                    <div className='oneWord'>
                        <>
                        <p className="ListedShortWord ">{user.question}</p>
                        <p className="ListedShortWord ">{user.text_data}</p>
                        </>
                        
                    </div>

                    </div>}
            )}
    </div>

    )
}

import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';


export default function ListWords() {
    const [users, setUsers] = useState([]) 

    useEffect(() =>{
        getUsers()

    },[])

    
    async function getUsers(){
      await axios.get('http://localhost/learning_app_react_php/').then(function(response){
          // console.log(response.data);
          setUsers(response.data)
         
      })
  }
    
  return (
    <div>

        {users.map((user) =>{  
        return  <div id={user.id} className='' key={user.id}>

                    <p className="">{user.german}</p>
                    <p className="">{user.english}</p>
                
                </div>}
        )}
                
    </div>
)
}

import React from 'react'
import axios from 'axios';
import {useState } from 'react';
import './DoNotShowAgainButton.css'

// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash} from '@fortawesome/free-solid-svg-icons'

// OnClick DISABLE CLICK AGAIN..
function handle_clicked(e){
    e.preventDefault();
    const icon  = e.target;
    const grandParentDiv = icon.closest('.eye-slash-icon');

    if (grandParentDiv) {
      grandParentDiv.classList.add('correct_wrong_clicked');
    }
  }

export default function DoNotShowAgainButton() {
  return (
    <div>
        <FontAwesomeIcon 
            icon={faEyeSlash}
            className='eye-slash-icon' 
            onClick={(e) => handle_clicked(e)}
        />
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import axios from 'axios';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './LongTextForm.css';

// bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function LongTextForm() {
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const [question, setQuestion] = useState('');

  const [style, setStyle] = useState('');

  useEffect(() => {
    
    let html = document.querySelector('div[data-contents="true"]');
    const outerHTML = html.outerHTML;
    setStyle(outerHTML);
    // console.log(outerHTML)
  }, [editorState]);

//   onClick, save data into database.
    const save_long_text = (e) => {
        e.preventDefault();
        axios.post("http://localhost/learning_app_react_php/save_longText.php",
        {text_data: style,question: question}).then(function(response){
            console.log(response)
            setQuestion('')
        });  
    }
//   Handle question const.
    const handleChangeQuestion = (e) => {
      const value = e.target.value;
      setQuestion(value);
    };

  return (
    <div className="App">
      <input
        type="text"
        value={question}
        onChange={handleChangeQuestion}
        placeholder="Question"
        name="question"
        autoComplete="off"
      />
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      <Button variant="primary" onClick={save_long_text}>Submit</Button>
    </div>
  )
}

export default LongTextForm
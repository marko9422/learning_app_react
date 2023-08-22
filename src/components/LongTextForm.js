import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
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
  const [convertedContent, setConvertedContent] = useState(null);
  const [question, setQuestion] = useState('');

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);

  // console.log(convertedContent);

//   onClick, save data into database.
    const save_long_text = (e) => {
        e.preventDefault();
        axios.post("http://localhost/learning_app_react_php/save_longText.php",
        {text_data: convertedContent,question: question}).then(function(response){
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
import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import axios from 'axios';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

function CodeEditor() {
  const [code, setCode] = useState('');
  const [compilation, setCompilation] = useState('');

  const runCode = () => {
    axios
      .get('https://open-stata.herokuapp.com/api/runcode')
      .then((res) => {
        setCompilation(res.data);
      })
      .catch((err) => {
        setCompilation(err);
      });
  };

  return (
    <div className="editorView">
      <div className="comp">
        <p>{compilation}</p>
      </div>
      <div>
        <Editor
          value={code}
          onValueChange={(newCode) => setCode(newCode)}
          padding={20}
          highlight={(newCode) => highlight(newCode, languages.js)}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
          id="editor"
        />
        <button type="button" onClick={() => runCode()}>
          Run code
        </button>
      </div>
    </div>
  );
}

export default CodeEditor;

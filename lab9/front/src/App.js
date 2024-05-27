import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function init() {
      try {
        const result = await axios.get('http://localhost:8000/welcome');
        const area = document.getElementById('chatArea');
        const oldHtml = area.innerHTML;
        area.innerHTML = oldHtml + "<p><b>Chat: </b>" + result.data.response + "</p>";
      } catch (error) {
        console.error(error);
      }
      
    }
    init();
  }, [])

  const sendMessage = async () => {
    try {
      const result = await axios.post('http://localhost:8000/chat', {
        message
      });
      const area = document.getElementById('chatArea');
      const oldHtml = area.innerHTML;
      area.innerHTML = oldHtml + "<p><b>You: </b>" + message + "</p>" + "<p><b>Chat: </b>" + result.data.response + "</p>";
      
      const input = document.getElementById('input');
      input.value = '';
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  const finish = async () => {
    try {
        const result = await axios.get('http://localhost:8000/goodbye');
        const area = document.getElementById('chatArea');
        const oldHtml = area.innerHTML;
        area.innerHTML = oldHtml + "<p><b>Chat: </b>" + result.data.response + "</p>";
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <div style={{margin: 20}}>
      <h1>Chat Application</h1>
      <input
        id="input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{marginRight: 10}}
      />
      <button onClick={sendMessage}>Send</button>
      <br/><br/>
      <button onClick={finish}>Finish</button>
      <div id='chatArea'></div>
    </div>
  );
}

export default App;

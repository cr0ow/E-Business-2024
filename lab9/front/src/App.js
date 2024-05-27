import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
      try {
        const result = await axios.get('http://localhost:5000/welcome');
        const area = document.getElementById('chatArea');
        area.innerHTML = "<p><b>Chat: </b>" + result.data.welcomeMessage + "</p>";
      } catch (error) {
        console.error(error);
      }
    }

  const sendMessage = async () => {
    try {
      const result = await axios.post('http://localhost:5000/chat', {
        "message": message
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

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const finish = async () => {
    try {
        const result = await axios.get('http://localhost:5000/goodbye');
        const area = document.getElementById('chatArea');
        const oldHtml = area.innerHTML;
        area.innerHTML = oldHtml + "<p><b>Chat: </b>" + result.data.goodbyeMessage + "</p>";

        const timer = document.getElementById('timer');
        for(let i = 3; i > 0; i--) {
          timer.innerText = '(' + i + ')'
          await sleep(1000);
        }
        
        area.innerHTML = '';
        const input = document.getElementById('input');
        input.value = '';
        timer.innerText = '';
        await init();

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
        style={{marginRight: 10, padding: 5}}
      />
      <button onClick={sendMessage}>Send</button>
      <br/><br/>
      <button onClick={finish}>Finish</button>
      <div id='chatArea'></div>
      <span id='timer'></span>
    </div>
  );
}

export default App;

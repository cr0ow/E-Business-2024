import '../styles.css';
import React, {useState} from "react";
import {Link} from 'react-router-dom';

export default function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(login, password);
  };

  const signIn = async (login, email) => {
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password })
    });
    if(res.status === 400) {
      const warning = document.getElementById('warning');
      warning.style.color = 'red';
      warning.innerText = 'Invalid login or password';
    }
  }

  return (
    <div id={'container'}>
      <h1>Sign in</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login">Login</label>
        <input
          id="login"
          type="text"
          value={login}
          onChange={handleLoginChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Sign in"/>
        <span id={'warning'}></span>
      </form>
      <Link to={'/register'}>Sign up</Link>
    </div>
  );
}
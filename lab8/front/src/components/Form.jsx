import '../styles.css';
import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Form({main, other, message}) {
  const location = useLocation();
  const navigate = useNavigate();

  const mainText = location.state?.main || main;
  const otherText = location.state?.other || other;
  const messageText = location.state?.message || message;
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
    if (login.trim() === '' || password.trim() === '') {
      const warning = document.getElementById('warning');
      warning.style.color = 'red';
      warning.innerText = 'Both login and password must be provided';
      return;
    }
    if (mainText === 'Sign in') {
      submitLogin(login, password);
    } else {
      submitRegister(login, password);
    }
  };

  const submitLogin = async (login, password) => {
    const res = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login, password})
    });
    if (res.status === 403) {
      const warning = document.getElementById('warning');
      warning.style.color = 'red';
      warning.innerText = 'Invalid login or password';
    } else {
      const data = await res.json();
      Cookies.set('jwt', data.accessToken);
      navigate('/welcome')
    }
  }

  const submitRegister = async (login, password) => {
    const res = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({login, password})
    });
    if (res.status === 400) {
      const warning = document.getElementById('warning');
      warning.style.color = 'red';
      warning.innerText = 'Account with this login already exists';
    } else {
      navigate('/')
      const warning = document.getElementById('warning');
      warning.style.color = 'black';
      warning.innerText = 'You are signed up, try to log in now!';
    }
  }

  useEffect(() => {
    const warning = document.getElementById('warning');
    warning.style.color = 'black';
    warning.innerText = '';
  }, []);

  return (
    <div id={'container'}>
      <h1>{mainText}</h1>
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
        <input type="submit" value={`${mainText}`}/>
        <span id={'warning'}></span>
      </form>
      <Link
        to={{
          pathname: mainText === 'Sign in' ? '/register' : '/',
          state: {main: otherText, other: mainText, message: messageText}
        }}
      >
        {otherText}
      </Link>
    </div>
  );
}
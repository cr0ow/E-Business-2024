import {useEffect, useState} from "react";
import Cookies from 'js-cookie';

export default function Welcome() {
  const [secret, setSecret] = useState('');

  useEffect(() => {
    async function fetchSecret() {
      const jwt = Cookies.get('jwt');
      const res = await fetch('http://localhost:8000/secret', {
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });
      const data = await res.json();
      setSecret(data.secret);
    }
    fetchSecret();
  }, []);

  return (
    <div id={'container'}>
      <h1>Welcome!</h1>
      <span>Secret message from server: <b>{secret}</b></span>
    </div>
  );
}
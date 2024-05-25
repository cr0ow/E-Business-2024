import './App.css';
import React from "react";

function App() {
  return (
    <BrowserRouter>

    </BrowserRouter>
    <div id={'container'}>
      <form>
        <label for={'login'}>Login</label>
        <input id={'login'} type={'text'}/>
        <label for={'password'}>Password</label>
        <input id={'password'} type={'password'}/>
      </form>
      <Link></Link>
    </div>
  );
}

export default App;

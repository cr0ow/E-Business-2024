import React from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Form from './components/Form';
import Welcome from "./components/Welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Form main={'Sign in'} other={'Sign up'} message={''}/>}></Route>
        <Route path={'/register'} element={<Form main={'Sign up'} other={'Sign in'} message={''}/>}></Route>
        <Route path={'/welcome'} element={<Welcome/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

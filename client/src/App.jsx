<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
=======
import { useState } from 'react';
import { Routes, Route, Navigate} from "react-router-dom";
import './App.css';

import Home from "./component/home/Home"

function App() {

  return (
    <Routes>
      <Route
      path="/"
      // element={isLogin ? <Navigate to="/report/monthly" /> : <Login />}
      element={<Home />}
      />
      {/* <Route path="/*" element={isLogin ? <Main /> : <Navigate to="/" />} /> */}
    </Routes>
  )
>>>>>>> e1184c6820078bf3a9a019f8c13a252abd8a73bf
}

export default App;

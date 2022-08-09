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
}

export default App

//Import
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./config/firebase.js";
import axios from "axios";

import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "./recoil/LoginAtom.js";

//Component
import Login from "./component/login/Login.jsx";
import Home from "./component/home/Home.jsx";
import Detail from "./component/post/PostDetail.jsx"
import Upload from "./component/upload";

//Style
import "./App.css";
import Register from "./component/register/Register.jsx";

function App() {
  const [user, setUser] = useRecoilState(userState);
  const clearUser = useResetRecoilState(userState);

  

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userInfo) => {
      if (userInfo) {
        let temp = {
          isLogin: true,
          userDoc: userInfo,
        };
        setUser(temp);
      } else {
        clearUser();
      }
    });
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:postId" element={<Detail />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
}

export default App;

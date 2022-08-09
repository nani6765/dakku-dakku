<<<<<<< HEAD
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { loginState } from '../../recoil/atom';
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { loginState } from "../../recoil/LoginAtom";
>>>>>>> dev/panco

function Home() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);

<<<<<<< HEAD
  console.log(localStorage.getItem("recoil-persist"))
  const LogoutFunc = () => {
    localStorage.removeItem("recoil-persist")
    setIsLogin(false);
    navigate("/");
  }

  return (
    <div>
      {isLogin
        ? <button onClick={ () => {LogoutFunc()} }>로그아웃</button>
        : <button onClick={() => { navigate("/login") }}>로그인</button>
      }
      home
    </div>
  )
}

export default Home
=======
  console.log(localStorage.getItem("recoil-persist"));
  const LogoutFunc = () => {
    localStorage.removeItem("recoil-persist");
    setIsLogin(false);
    navigate("/");
  };

  return (
    <div>
      {isLogin ? (
        <button
          onClick={() => {
            LogoutFunc();
          }}
        >
          로그아웃
        </button>
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인
        </button>
      )}
      home
    </div>
  );
}

export default Home;
>>>>>>> dev/panco

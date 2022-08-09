import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { loginState, idState } from '../../recoil/atom';
import { selector, useRecoilState } from 'recoil';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useRecoilState(idState);
  const [userPw, setUserPw] = useState('');
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const LoginFunc = (e) => {
    e.preventDefault();
    setIsLogin(true)
    console.log("id:", userId);
    console.log("pw:", userPw);
    console.log("login_state:", isLogin);
    // localStorage.setItem("userId", userId)
    navigate('/');
  }

  // console.log(localStorage.getItem("userId"))
  // console.log(userId);

  const responseGoogle = (response) => {
    // console.log(response);
  }

  return (
    <>
    <div>
      <button onClick={()=>{ navigate("/") }}>홈</button>
    </div>
    <br/>

    --- 로그인 ---
    <form onSubmit={LoginFunc}>
      <input type="text" placeholder='ID' onChange={(e)=>{ setUserId(e.target.value); }}></input>
      <br/>
      <input type="password" placeholder='PW' onChange={(e)=>{ setUserPw(e.target.value); }}></input>
      <br/>
      <button type="submit">로그인</button>
    </form>
    <br/>

    --- 소셜 로그인 ---
    <div>
      <GoogleLogin
        clientId="767912908809-dim7a1e0qahmb537gdhsuiuc5a61ejs1.apps.googleusercontent.com"
        buttonText="구글 로그인"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
    </>
  )
}

export default Login
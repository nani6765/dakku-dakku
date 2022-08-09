import React from 'react';
import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from '../../../recoil/LoginAtom';

export default function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  console.log(localStorage.getItem("recoil-persist"))
  const LogoutFunc = () => {
    localStorage.removeItem("recoil-persist")
    setIsLogin(false);
    navigate("/");
  }

  return (
    <Nav>
        <div>다꾸다꾸</div>
        {isLogin
        ? <button onClick={ () => {LogoutFunc()} }>로그아웃</button>
        : <button onClick={() => { navigate("/login") }}>로그인</button>
      }
    </Nav>
  )
}

// emotion component
// -----------------
const Nav = styled.header`
  width: 100%;
  text-align: center;
  padding: 10px 0;
  background-color: blue;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;
  margin-bottom: 60px
`


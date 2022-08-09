import React from 'react';
import styled from '@emotion/styled';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState, idState } from '../../../recoil/LoginAtom';

export default function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const [userID, setuserID] = useRecoilState(idState);

  console.log(localStorage.getItem("recoil-persist"))
  
  const LogoutFunc = () => {
    localStorage.removeItem("recoil-persist")
    setIsLogin(false);
    navigate("/");
  }

  const UserSetInfo = function(login){
    if(login.login){
      return(
        <>
          <span>{userID}님, 안녕하세요</span>
          <button onClick={ () => {LogoutFunc()} }>로그아웃</button>
        </>
      )
    }
    else{
      return(
        <>
          <span>로그인시 이용 가능합니다.</span>
          <button onClick={() => { navigate("/login") }}>로그인</button>
        </>
      )
    }
  }

  return (
    <Nav>
        <LogoBox>
          <a href="/">
            <Logo src="/image/logo.png" alt="다꾸다꾸" />
          </a>
        </LogoBox>
        <UserSet>
          <UserSetInfo login={isLogin} />
        </UserSet>
    </Nav>
  )
}

// emotion component
// -----------------
const Nav = styled.header`
  width: 100%;
  text-align: center;
  padding: 10px 0;
  border-bottom: 2px solid blue;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;
  margin-bottom: 60px;
  overflow: auto;
`

const Logo = styled.img`
  width: 120px
`

const LogoBox = styled.div`
  float: left;
`

const UserSet = styled.div`
  float: right
`
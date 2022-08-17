import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { firebaseAuth } from "../../config/firebase.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const LoginFunc = async (e) => {
    e.preventDefault();
    //doc. 실제 유저가 입력한 정보로.
    let doc = { email: "test@test.com", password: "123456" };

    await signInWithEmailAndPassword(firebaseAuth, doc.email, doc.password)
      .then((userInfo) => {
        // 로그인이 성공.
        // 유저가 입력한 id(email), displayName : userInfo
        // recoil >> post upload할때 사용할 수 있도록.
      })
      .catch((err) => {
        console.log("로그인실패!", err);
        // 로직.
      });
  };

  /* Test */
  const LogoutFunc = async (e) => {
    e.preventDefault();
    await signOut(firebaseAuth)
      .then(() => {
        // navigate main
      })
      .catch((error) => {
        console.log("로그아웃 실패!", error);
      });
  };
  /* Test End*/

  return (
    <>
      <div>
        <button
          onClick={(e) => {
            LogoutFunc(e);
          }}
        >
          로그아웃
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          홈
        </button>
      </div>
      <br />
      --- 로그인 ---
      <form onSubmit={LoginFunc}>
        <input
          type="text"
          placeholder="ID"
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        ></input>
        <br />
        <input
          type="password"
          placeholder="PW"
          onChange={(e) => {
            setUserPw(e.target.value);
          }}
        ></input>
        <br />
        <button type="submit">로그인</button>
      </form>
      <br />
      --- 소셜 로그인 ---
      <div>
        {/*
        <GoogleLogin
          clientId="767912908809-dim7a1e0qahmb537gdhsuiuc5a61ejs1.apps.googleusercontent.com"
          buttonText="구글 로그인"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        */}
      </div>
    </>
  );
}

export default Login;

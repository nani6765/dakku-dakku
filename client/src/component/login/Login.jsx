import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { firebaseAuth } from "../../config/firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const LoginFunc = async (e) => {
    e.preventDefault();
    let doc = { email: "test@test.com", password: "123456" };
    await signInWithEmailAndPassword(firebaseAuth, doc.email, doc.password)
      .then((elem) => {
        // navigate main
      })
      .catch((err) => {
        console.log("로그인실패!", err);
      });
  };

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

  // console.log(localStorage.getItem("userId"))
  // console.log(userId);

  const responseGoogle = (response) => {
    // console.log(response);
  };

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
        <GoogleLogin
          clientId="767912908809-dim7a1e0qahmb537gdhsuiuc5a61ejs1.apps.googleusercontent.com"
          buttonText="구글 로그인"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
}

export default Login;

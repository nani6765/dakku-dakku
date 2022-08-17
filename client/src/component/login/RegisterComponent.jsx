import React, { useState } from "react";
import { firebaseAuth } from "../../config/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function RegisterComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [displayName, setdisplayName] = useState("");

  const registerFunc = async (e) => {
    e.preventDefault();
    console.log(email, password, passwordChk, displayName);
    if (!(email && password && passwordChk && displayName)) {
      if (!email) return alert("이메일을 입력하세요.");
      else if (!password) return alert("비밀번호를 입력하세요.");
      else if (!passwordChk) return alert("비밀번호 확인 입력하세요.");
      else if (!displayName) return alert("닉네임을 입력하세요.");
      else if (password !== passwordChk)
        return alert("비밀번호가 일치하지 않습니다.");
      else return alert("닉네임을 입력하세요.");
    }

    let body = {
      email,
      password,
      displayName,
    };

    let firebaseUser = await createUserWithEmailAndPassword(
      firebaseAuth,
      body.email,
      body.password
    ).then(async (doc) => {
      console.log(doc.user);
      await updateProfile(doc.user, {
        displayName,
      });
      return doc.user;
    });

    console.log(firebaseUser);
  };

  return (
    <div>
      <form onSubmit={(e) => registerFunc(e)}>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="비밀번호 확인"
          value={passwordChk}
          onChange={(e) => {
            setPasswordChk(e.target.value);
          }}
        />
        <br />
        <input
          type="text"
          placeholder="닉네임"
          value={displayName}
          onChange={(e) => {
            setdisplayName(e.target.value);
          }}
        />
        <br />
        <input type="submit" value="회원가입" />
      </form>
    </div>
  );
}

export default RegisterComponent;

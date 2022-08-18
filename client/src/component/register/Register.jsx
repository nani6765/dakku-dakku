import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { firebaseAuth } from "../../config/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import styled from "@emotion/styled";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [displayName, setdisplayName] = useState("");
  const [registerLoading, setRegisterLoading] = useState(false);
  const navigate = useNavigate();

  const registerFunc = async (e) => {
    e.preventDefault();
    if (!email) return alert("이메일을 입력하세요.");
    if (!password) return alert("비밀번호를 입력하세요.");
    if (password != passwordChk) return alert("비밀번호가 일치하지 않습니다.");
    if (!displayName) return alert("닉네임을 입력하세요.");

    setRegisterLoading(true);

    let body = {
      email,
      password,
      displayName,
    };

    const FirebaseRegisterFunc = (userInfo) => {
       return await createUserWithEmailAndPassword(
        firebaseAuth,
        userInfo.email, //
        userInfo.password //
      )
        .then(async (doc) => {
          await updateProfile(doc.user, {
            displayName, //
          });
          return doc.user;
        })
        .catch((err) => {
          console.log(err.code)
          // return thorw
          // 1. email 중복
          // 2. password 6자리 이하
          // 3. etc..
        });
    }

    try {
      let userDoc = await FirebaseRegisterFunc(body);
      body.uid = userDoc.uid; //password를 보내지만, 서버에서 저장하지 않음.
      body.password = ""; //obj delete key.

      await axios
        .post("/api/user/register", body)
        .then((res) => {
          if (res.data.success) {
            console.log("success");
            alert("회원가입 완료");
            setRegisterLoading(false);
            navigate("/");
          } else {
            // return throw
          }
        });
    } catch (err) {
      //thorw code에 따라서 다르게 알려주기;
      console.log(err)
    }
  };

  return (
    <RegisterBox>
      <form action="submit">
        <Input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <Input
          type="text"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <Input
          type="text"
          placeholder="비밀번호 확인"
          value={passwordChk}
          onChange={(e) => {
            setPasswordChk(e.target.value);
          }}
        />
        <br />
        <Input
          type="text"
          placeholder="닉네임"
          value={displayName}
          onChange={(e) => {
            setdisplayName(e.target.value);
          }}
        />
        <br />
        <RegisterButton onClick={registerFunc}>
          {registerLoading ? "Loading..." : "회원가입"}
        </RegisterButton>
        <GotoLogin
          onClick={() => {
            navigate("/login");
          }}
        >
          로그인 이동
        </GotoLogin>
      </form>
    </RegisterBox>
  );
}

export default Register;
const RegisterBox = styled.div`
  margin: 5px;
`;
const Input = styled.input`
  width: 200px;
  height: 20px;
  padding: 5px 10px;
  border: 1px solid #a4a4a4;
  margin: 0 0 5px 0;
  &:focus {
    outline: 2px solid lightgreen;
    border: none;
  }
`;
const RegisterButton = styled.button`
  box-sizing: content-box;
  width: 200px;
  height: 20px;
  padding: 5px 10px;
  margin: 0 0 5px 0;
  background-color: #000;
  color: white;
  border: 1px solid #000;
  cursor: pointer;
`;
const GotoLogin = styled.p`
  font-size: 13px;
  cursor: pointer;
`;

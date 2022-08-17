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

    if (
      email &&
      password &&
      passwordChk &&
      displayName &&
      password == passwordChk
    ) {
      setRegisterLoading(true);

      let body = {
        email,
        password,
        displayName,
      };

      try {
        let firebaseUser = await createUserWithEmailAndPassword(
          firebaseAuth,
          body.email, //
          body.password //
        )
          .then(async (doc) => {
            await updateProfile(doc.user, {
              displayName, //
            });
            return doc.user;
          })
          .catch((err) => {
            console.log("에러입니다", err.code.split("/")[1]);
          });
        // 이메일 형식, 중복 이메일, 비밀번호 길이

        let user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        };
        console.log("user", user);

        await axios
          .post("http://localhost:5000/api/user/register", user)
          .then((res) => {
            if (res.data.success) {
              console.log("success");
              alert("회원가입 완료");
              setRegisterLoading(false);
              navigate("/");
            } else {
              console.log("false");
            }

            console.log(res);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      if (!email) alert("이메일을 입력하세요.");
      if (!password) alert("비밀번호를 입력하세요.");
      if (password != passwordChk) alert("비밀번호가 일치하지 않습니다.");
      if (!displayName) alert("닉네임을 입력하세요.");
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

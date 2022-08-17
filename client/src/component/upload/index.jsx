//Import
import { useState, useRef } from "react";
import axios from "axios";

import { useRecoilState, useResetRecoilState } from "recoil";
// vite.config.js alias(별칭)
import { userState } from "../../recoil/LoginAtom.js";

export default function Upload() {
  const [user, setUser] = useRecoilState(userState);
  const clearUser = useResetRecoilState(userState);

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [publics, setPublics] = useState(true);

  const userTagInput = useRef();
  const mainText = useRef();
  const publicCheck = useRef();

  const TagInputClick = () => {
    userTagInput.current.value = ""; //value
    setTagList([...tagList, tag]);
    setTag("");
    console.log(tagList);
  };

  const TagInputChange = (e) => {
    setTag(e.target.value);
  };

  const PostFunc = () => {
    const body = {
      uid: "userId",
      email: "userEmail",
      mainText: mainText.current.value,
      tagList: [...tagList],
      public: publics,
    };
    axios.post("/api/post/submit", body).then((res) => {
      console.log(res);
      //다음 로직.
      //성공했을 때 & 실패했을 때.
    });
  };

  return (
    <section>
      <textarea
        name="mainText"
        id="mainText"
        cols="30"
        rows="10"
        ref={mainText}
      ></textarea>
      <p className="text">
        {tagList.map((tl, idx) => {
          return <span key={idx}>#{tl} </span>;
        })}
      </p>
      <div>
        공유할까?
        <label htmlFor="public">
          <input
            type="radio"
            name="public"
            id="public_yes"
            value={true}
            className="pb_checked"
            defaultChecked
            onChange={() => setPublics((prev) => !prev)}
          />
          <input
            type="radio"
            name="public"
            id="public_no"
            value={false}
            onChange={() => setPublics((prev) => !prev)}
          />
        </label>
      </div>
      <input
        type="text"
        id="tagList"
        onChange={(e) => TagInputChange(e)}
        ref={userTagInput}
      />
      <button type="button" onClick={() => TagInputClick()}>
        입력
      </button>

      <div>
        <button
          type="button"
          onClick={() => {
            PostFunc();
          }}
        >
          보내기
        </button>
      </div>
    </section>
  );
}

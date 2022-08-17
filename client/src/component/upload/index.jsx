//Import
import { useState, useEffect, useRef } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../config/firebase.js";
import axios from "axios";

import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "../../recoil/LoginAtom.js";

export default function Upload() {

  const [user, setUser] = useRecoilState(userState);
  const clearUser = useResetRecoilState(userState);

  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState([]);
  const [publics, setPublics] = useState(true)

  const userTagInput = useRef();
  const mainText = useRef();
  const publicCheck = useRef();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userInfo) => {
      console.log(userInfo)
      if (userInfo) {
        let temp = {
          isLogin: true,
          userDoc: userInfo,
        };
        setUser(temp);
        setUserId(userInfo.uid)
        setUserEmail(userInfo.email)
      } else {
        clearUser();
      }
    });
  }, []);

  const TagInputClick  = function(){
    
    userTagInput.current.value = "";
    setTagList([...tagList, tag]);
    setTag("");
    console.log(tagList);
  }

  const TagInputChange = function(e){
    const { value, name } = e.target;
    
    setTag(e.target.value)
  }

  const PostFunc = ()=>{
    const body = {
      uid: userId,
      email: userEmail,
      mainText: mainText.current.value,
      tagList: [...tagList],
      public: publics
    }

    console.log(body)

    axios.post("/api/post/submit", body)
    .then((res)=>{
      console.log(res)
    })
  }
  
  return (
    <section>
        <textarea name="mainText" id="mainText" cols="30" rows="10" ref={mainText}></textarea>
        <p className="text">
          {
            tagList.map((tl, idx)=>{
              return <span key={idx}>#{tl} </span>
            })
          }
        </p>
        <div>
          공유할까?
          <label htmlFor="public" >
            <input type="radio" name="public" id="public_yes" value={true} className="pb_checked" defaultChecked onChange={() => setPublics(prev => !prev)} />
            <input type="radio" name="public" id="public_no" value={false} onChange={() => setPublics(prev => !prev)} />
          </label>
        </div>
        <input type="text" id="tagList" onChange={(e)=> TagInputChange(e)} ref={userTagInput}/>
        <button type="button" onClick={()=> TagInputClick()}>입력</button>

        <div>
          <button type="button" onClick={()=>{PostFunc()}}>보내기</button>
        </div>
    </section>
  )
}

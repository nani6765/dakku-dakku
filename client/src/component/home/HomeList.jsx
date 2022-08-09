import React from 'react';

import styled from '@emotion/styled';

import Profile from "./element/Profile"
import ContentBox from "./element/ContentBox"
import Reaction from "./element/Reaction"
import WriteBox from "./element/WriteBox"
import SlideBox from "./element/SlideBox"



export default function HomeList(info) {
    const {
        id, 
        profileImg,
        nickname, 
        date, 
        time, 
        image, 
        content, 
        like, 
        comment, 
        tag,
        postId
    } = info.info

  return (
    <List>
        <Profile profileImg={profileImg} nickname={nickname}  />

        <WriteBox id={id} date={date} time={time} />

        <SlideBox image={image} />
        
        <ContentBox tag={tag} content={content} postId={postId} />
        
        <Reaction like={like} comment={comment} />
    </List>
  )
}


// emotion component
// -----------------
const List = styled.li`
    margin-bottom: 40px;
    width: 20%;
    padding: 30px 15px;
    border: 2px solid #9c9c9c;
    border-radius: 15px;
`

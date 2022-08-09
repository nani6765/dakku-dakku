import React from 'react';
import styled from '@emotion/styled';





export default function Profile(profile) {

    
  return (
    <ProfileDiv>
        <ProfileImgBox>
            <ProfileImg>{profile.profileImg}</ProfileImg>
        </ProfileImgBox>
        <Nickname>
            {profile.nickname}
        </Nickname>
    </ProfileDiv>

  )
}

// emotion component
// -----------------
const ProfileDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px
`

const ProfileImgBox = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 55%;
    background-color: blue;
    display: inline-block;
    margin-right: 10px
`

const ProfileImg = styled.div`
    width: 100%;
`

const Nickname = styled.div`
    font-weight: bold;
    position: relative;
    top: -1px
`
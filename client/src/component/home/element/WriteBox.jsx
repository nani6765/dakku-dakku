import React from 'react';
import styled from '@emotion/styled';

export default function WriteBox(write) {
  return (
    <WriteDiv>
        <UserId>@{write.id}</UserId>
        <WriteDate>{write.date}</WriteDate>
        {/* <WriteDate>{write.date} {write.time}</WriteDate> */}
    </WriteDiv>
  )
}

// emotion component
// -----------------
const WriteDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;

`

const UserId = styled.span`
  font-size: 14px;
`

const WriteDate = styled.span`
  font-size: 12px;
  
`

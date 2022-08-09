import React from 'react';
import styled from '@emotion/styled';

export default function ContentBox(contents) {
  return (
    <TagDiv>
        <TagBox>
            {contents.tag.map((tg, idx)=>{
                return <Tag key={idx}>#{tg} </Tag>
            })}
        </TagBox>
        <Content href={`/post/${contents.postId}`}>
            {contents.content}
        </Content>
    </TagDiv>
  )
}

// emotion component
// -----------------
const TagDiv = styled.div`
    margin-bottom: 10px;
`

const TagBox = styled.div`
    margin-bottom: 5px;
`

const Tag = styled.span`
    font-weight: bold;
    font-size: 14px;
    color: blue;
`

const Content = styled.a`

`
import React from 'react';
import styled from '@emotion/styled';

export default function Reaction(reaction) {
  return (
    <ReactionBox>
        <LikeAndComment>
            좋아요 : <Like>{reaction.like}</Like>
        </LikeAndComment>
        <LikeAndComment>
            댓글 : <Comment>{reaction.comment}</Comment>
        </LikeAndComment>
    </ReactionBox>
  )
}

// emotion component
// -----------------
const ReactionBox = styled.div`
  display: flex;
  
`

const LikeAndComment = styled.div`
  font-size: 14px;
`

const Like = styled.span`
  font-size: 14px;
`

const Comment = styled.span`
  font-size: 14px;
`
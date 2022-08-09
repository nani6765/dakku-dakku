import React from 'react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
    const postInfo = useParams();
    const postId = postInfo.postId;

    console.log(postId)
  return (
    <div>
        {postId}
    </div>
  )
}

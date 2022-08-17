import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
    const postInfo = useParams();
    const postId = postInfo.postId;

    console.log(postId)
    const body = {
      postNum: Number(postId)
    }
    useEffect(()=>{
      axios.post("/api/post/detail",body)
      .then((res)=>{
        console.log(res)
      })
    }, [])
    
  return (
    <div>
        {postId}
    </div>
  )
}

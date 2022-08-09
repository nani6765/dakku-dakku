import React from 'react';
import styled from '@emotion/styled';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";

import "../swiperCss.css"

SwiperCore.use([Navigation, Pagination])

export default function SlideBox(image) {
  return (
    <SlideDiv>
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={
                () => console.log('slide change')
            }
        >
            {image.image.map((img,idx)=>{
                return (
                    <SwiperSlide key={idx}>
                        <img src={img} style={{width: "100%"}} alt="" />
                    </SwiperSlide>
                )
            })}
            </Swiper>
    </SlideDiv>
  )
}

// emotion component
// -----------------
const SlideDiv = styled.div`
    margin-bottom: 10px;
`

const ListImgBox = styled.div`
    
`

const ListImg = styled.img`

`
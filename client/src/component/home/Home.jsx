import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import styled from '@emotion/styled'

import HomeList from "./HomeList";
import Header from "./element/Header"



export default function home() {
    const [userList, setUserList] = useState([]);
    const pubList = [];

    useEffect(() => {
        axios.get("/data/mockdata.json")
        .then((res)=>{
            console.log("Code :", res.status)
            return res.data
        })
        .then((data)=>{
             data.map((li)=>{
                if(li.publics == true){
                    pubList.push(li)
                }
            })
        })
        .then(()=>{
            setUserList(pubList);
 
        })
    }, []);

    return (
        <MainPage>
            <Header />
            <ViewList>
                <ListBox>
                    {   
                        userList.length > 0
                        ? userList.map((pl, idx)=>{ 
                                return <HomeList info={pl} key={idx} /> 
                            })
                        : false
                    }
                </ListBox>
            </ViewList>
        </MainPage>
    )

}

// emotion component
// -----------------
const MainPage = styled.section`
    
`

const ViewList = styled.article`
    width: 90%;
    margin: 0 auto;
`

const ListBox = styled.ul`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`

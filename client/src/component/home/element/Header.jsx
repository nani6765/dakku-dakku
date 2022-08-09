import React from 'react';
import styled from '@emotion/styled';

export default function Header() {
  return (
    <Nav>
        다꾸다꾸
    </Nav>
  )
}

// emotion component
// -----------------
const Nav = styled.header`
  width: 100%;
  text-align: center;
  padding: 10px 0;
  background-color: blue;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  box-sizing: border-box;
  margin-bottom: 60px
`


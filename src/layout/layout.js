/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Outlet, Link } from "react-router-dom";
import StyledButton from '../components/atoms/StyledButton';
import CircuitBackground from '../components/CircuitBackground';
import { useEffect, useState } from 'react';
import SubscribeDialog from '../components/atoms/SubscribeDialog';

const footerCss = css`
  display: flex;
  padding: 20px;
  flex-wrap: wrap; 
  justify-content: space-between;
  background-color: var(--dark-purple); 
  filter: brightness(0.7);
  @media screen and (max-width: 800px) {
    justify-content: center;
  }
`

const navCss = css`
  background-color: var(--dark-purple);
  filter: brightness(0.7);
  height: 69px;
  display: flex;
  align-items: center;
  z-index: 1;
  position: relative;
`

const navUlCss = css`
  display: flex;
  padding: 0;
  justify-content: space-between;
  list-style-type: none;
`

const linkItemCss = css`
  padding: 0.5rem 1rem;
  border-radius: 15px;
  margin: 0 1rem;
  transition: 0.5s all;
  &:hover{
    background-color: var(--dodger-blue);
    a {
      color: var(--baby-powder);
    }
  }
`

const spacingCss = css`
  padding: 10px;
`

const Layout = () => {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <>
      <nav css={navCss}>
        <ul css={navUlCss}>
          <li css={linkItemCss}>
            <Link to="/">Home</Link>
          </li>
          <li css={linkItemCss}>
            <Link to="/blog">Blog</Link>
          </li>
          <li css={linkItemCss}>
            <Link to="/dev">Dev</Link>
          </li>

        </ul>
      </nav>
      <main>
        <Outlet />
      </main>
      <footer css={footerCss} >

        <a css={spacingCss} href='https://portfolio-73964.web.app/'>My First Portfolio Website</a>
        <div css={spacingCss} style={{display: 'flex', justifyContent: "space-between", gap: '10px'}}>
          <StyledButton onClick={() => {setShowDialog(!showDialog)}}>Subscribe</StyledButton>
          <StyledButton onClick={() => {
              var email = 'matthewj1561@gmail.com';
              var subject = 'Blog Contact - {Your Name}';

              document.location = "mailto:"+email+"?subject="+subject
          }}>Contact Me</StyledButton>
        </div>
      </footer>
      <SubscribeDialog show={showDialog} close={() => {setShowDialog(!showDialog)}}/>
    </>
  )
};

export default Layout;
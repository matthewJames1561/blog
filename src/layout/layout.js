/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Outlet, Link } from "react-router-dom";
import StyledButton from '../components/atoms/StyledButton';
const navCss = css`
  background-color: var(--dark-purple);
  filter: brightness(0.7);
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 0 2rem;
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
      <footer style={{display: 'flex', padding: '20px', flexDirection: 'column',  backgroundColor: 'var(--dark-purple)', filter: 'brightness(0.7)' }}>
  
        <a css={spacingCss} href='https://portfolio-73964.web.app/'>My First Portfolio Website</a>
        <div css={spacingCss}>
          <StyledButton>Contact Me</StyledButton>
        </div>
      </footer>
    </>
  )
};

export default Layout;
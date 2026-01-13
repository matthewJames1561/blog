/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Outlet, Link } from "react-router-dom";
import StyledButton from '../components/atoms/StyledButton';
import CircuitBackground from '../components/CircuitBackground';
import { useState } from 'react';
import SubscribeDialog from '../components/atoms/SubscribeDialog';
import SocialLinks from '../components/atoms/SocialLinks';
import { colors, spacing, typography, transitions, radius, shadows, breakpoints } from '../theme';

const footerCss = css`
  display: flex;
  padding: ${spacing.xl};
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: ${spacing.lg};
  background-color: ${colors.darkPurple};
  filter: brightness(0.7);
  @media screen and (max-width: ${breakpoints.mobile}) {
    justify-content: center;
    flex-direction: column;
  }
`

const navCss = css`
  background: linear-gradient(180deg, rgba(30, 20, 50, 0.95) 0%, rgba(20, 10, 40, 0.98) 100%);
  backdrop-filter: blur(10px);
  width: 220px;
  min-height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  padding: ${spacing['5xl']} 0 ${spacing['4xl']} 0;
  z-index: 1;
  border-right: 1px solid ${colors.whiteAlpha(0.1)};
  box-shadow: 4px 0 20px ${colors.blackAlpha(0.3)};

  @media screen and (max-width: ${breakpoints.mobile}) {
    width: 100%;
    min-height: auto;
    position: relative;
    padding: ${spacing.xl} 0;
    border-right: none;
    border-bottom: 1px solid ${colors.whiteAlpha(0.1)};
  }
`

const navUlCss = css`
  display: flex;
  flex-direction: column;
  padding: 0;
  list-style-type: none;
  margin: 0;
  gap: ${spacing.sm};
`

const linkItemCss = css`
  position: relative;
  margin: 0 ${spacing.xl};
  transition: ${transitions.bouncy};
  
  a {
    display: block;
    padding: ${spacing.md} ${spacing.xl};
    border-radius: ${radius.md};
    background: ${colors.whiteAlpha(0.03)};
    border: 1px solid ${colors.whiteAlpha(0.08)};
    text-decoration: none;
    color: ${colors.whiteAlpha(0.7)};
    font-weight: ${typography.fontWeight.medium};
    font-size: ${typography.fontSize.lg};
    letter-spacing: 0.5px;
    transition: ${transitions.normal};
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: linear-gradient(180deg, ${colors.gold}, ${colors.pink});
      transform: scaleY(0);
      transition: transform 0.3s ease;
    }

    &::after {
      content: '→';
      position: absolute;
      right: ${spacing.xl};
      opacity: 0;
      transform: translateX(-10px);
      transition: ${transitions.normal};
    }
  }

  &:hover {
    transform: translateX(5px);

    a {
      background: ${colors.whiteAlpha(0.08)};
      border-color: ${colors.whiteAlpha(0.2)};
      color: ${colors.whiteAlpha(0.95)};
      padding-right: ${spacing['4xl']};

      &::before {
        transform: scaleY(1);
      }

      &::after {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }

  &:active {
    transform: translateX(3px) scale(0.98);
  }
`

const spacingCss = css`
  padding: ${spacing.md};
`

const layoutContainer = css`
  display: flex;

  @media screen and (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
  }
`

const mainContent = css`
  margin-left: 220px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
  }

  @media screen and (max-width: ${breakpoints.mobile}) {
    margin-left: 0;
  }
`

const Layout = () => {
  const [showDialog, setShowDialog] = useState(false)
  return (
    <div css={layoutContainer}>
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
          <li css={linkItemCss}>
            <Link to="/guestbook">Guestbook</Link>
          </li>

        </ul>
      </nav>
      <div css={mainContent}>
        <main>
          <Outlet />
        </main>
        <footer css={footerCss} >
          <SocialLinks />
          <a css={spacingCss} href='https://portfolio-73964.web.app/'>My First Portfolio Website</a>
          <div css={spacingCss}>
            <StyledButton onClick={() => {setShowDialog(!showDialog)}}>Subscribe</StyledButton>
          </div>
        </footer>
        <SubscribeDialog show={showDialog} close={() => {setShowDialog(!showDialog)}}/>
      </div>
    </div>
  )
};

export default Layout;
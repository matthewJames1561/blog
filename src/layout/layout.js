/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Outlet, Link } from "react-router-dom";
import StyledButton from '../components/atoms/StyledButton';
import CircuitBackground from '../components/CircuitBackground';
import { useState, useEffect } from 'react';
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

const navCss = (isOpen) => css`
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
  z-index: 1000;
  border-right: 1px solid ${colors.whiteAlpha(0.1)};
  box-shadow: 4px 0 20px ${colors.blackAlpha(0.3)};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media screen and (max-width: ${breakpoints.mobile}) {
    width: 280px;
    transform: translateX(${isOpen ? '0' : '-100%'});
    z-index: 1001;
  }
`

const hamburgerButtonCss = css`
  display: none;
  position: fixed;
  top: ${spacing.lg};
  left: ${spacing.lg};
  z-index: 1002;
  background: linear-gradient(135deg, rgba(30, 20, 50, 0.95), rgba(20, 10, 40, 0.98));
  backdrop-filter: blur(10px);
  border: 2px solid ${colors.whiteAlpha(0.2)};
  border-radius: ${radius.md};
  padding: ${spacing.md};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${shadows.lg};

  &:hover {
    border-color: ${colors.gold};
    box-shadow: 0 0 20px ${colors.blackAlpha(0.5)}, 0 0 10px rgba(253, 184, 19, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: ${breakpoints.mobile}) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`

const hamburgerLineCss = (isOpen) => css`
  width: 24px;
  height: 2px;
  background: ${colors.whiteAlpha(0.9)};
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:nth-of-type(1) {
    transform: ${isOpen ? 'translateY(7px) rotate(45deg)' : 'none'};
  }

  &:nth-of-type(2) {
    opacity: ${isOpen ? '0' : '1'};
    transform: ${isOpen ? 'translateX(-10px)' : 'none'};
  }

  &:nth-of-type(3) {
    transform: ${isOpen ? 'translateY(-7px) rotate(-45deg)' : 'none'};
  }
`

const overlayBackdropCss = (isOpen) => css`
  display: none;

  @media screen and (max-width: ${breakpoints.mobile}) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${colors.blackAlpha(0.7)};
    backdrop-filter: blur(5px);
    z-index: 999;
    opacity: ${isOpen ? '1' : '0'};
    pointer-events: ${isOpen ? 'all' : 'none'};
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

const linkItemCss = (index, isOpen) => css`
  position: relative;
  margin: 0 ${spacing.xl};
  transition: ${transitions.bouncy};

  @media screen and (max-width: ${breakpoints.mobile}) {
    opacity: ${isOpen ? 1 : 0};
    transform: ${isOpen ? 'translateX(0)' : 'translateX(-20px)'};
    transition: opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s;
  }

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
    padding-top: 70px;
  }
`

const Layout = () => {
  const [showDialog, setShowDialog] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <div css={layoutContainer}>
      {/* Hamburger Menu Button */}
      <button
        css={hamburgerButtonCss}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div css={hamburgerLineCss(isMenuOpen)} />
        <div css={hamburgerLineCss(isMenuOpen)} />
        <div css={hamburgerLineCss(isMenuOpen)} />
      </button>

      {/* Overlay Backdrop */}
      <div
        css={overlayBackdropCss(isMenuOpen)}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Navigation */}
      <nav css={navCss(isMenuOpen)}>
        <ul css={navUlCss}>
          <li css={linkItemCss(0, isMenuOpen)}>
            <Link to="/" onClick={handleLinkClick}>Home</Link>
          </li>
          <li css={linkItemCss(1, isMenuOpen)}>
            <Link to="/blog" onClick={handleLinkClick}>Blog</Link>
          </li>
          <li css={linkItemCss(2, isMenuOpen)}>
            <Link to="/dev" onClick={handleLinkClick}>Dev</Link>
          </li>
          <li css={linkItemCss(3, isMenuOpen)}>
            <Link to="/guestbook" onClick={handleLinkClick}>Guestbook</Link>
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
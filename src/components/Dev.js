/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import Orbit from './orbitComponents/Orbit';

const centerCss = css`
    margin: -20px;
`

const contentCss = css`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  
  /* Only content elements capture pointer events, not the empty space */
  & > * {
    pointer-events: auto;
  }
`;

const heroSection = css`
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInDown 1s ease-out;
  
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const title = css`
  font-size: 4rem;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #FDB813, #FF69B4, #4169E1);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(253, 184, 19, 0.3);
  animation: glow 3s ease-in-out infinite;
  
  @keyframes glow {
    0%, 100% { filter: brightness(1); }
    50% { filter: brightness(1.3); }
  }
`;

const subtitle = css`
  font-size: 1.5rem;
  color: #ccc;
  margin-top: 10px;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.5s forwards;
  
  @keyframes fadeIn {
    to { opacity: 1; }
  }
`;

const orbitingCards = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
  margin-top: 40px;
`;

const planetCard = css`
  background: rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: floatIn 0.8s ease-out backwards;
  
  &:nth-of-type(1) { animation-delay: 0.2s; }
  &:nth-of-type(2) { animation-delay: 0.4s; }
  &:nth-of-type(3) { animation-delay: 0.6s; }
  &:nth-of-type(4) { animation-delay: 0.8s; }
  
  @keyframes floatIn {
    from {
      opacity: 0;
      transform: translateY(50px) scale(0.8);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent, var(--glow-color), transparent);
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: var(--glow-color);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5),
                0 0 40px var(--glow-color-shadow);
    
    &::before {
      opacity: 0.5;
    }
  }
`;

const cardIcon = css`
  font-size: 3rem;
  margin-bottom: 15px;
  display: inline-block;
  
  @keyframes orbit {
    0%, 100% { transform: rotate(0deg) translateX(5px) rotate(0deg); }
    25% { transform: rotate(90deg) translateX(5px) rotate(-90deg); }
    50% { transform: rotate(180deg) translateX(5px) rotate(-180deg); }
    75% { transform: rotate(270deg) translateX(5px) rotate(-270deg); }
  }
`;

const cardTitle = css`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--card-color);
`;

const cardContent = css`
  font-size: 1rem;
  line-height: 1.6;
  color: #ddd;
`;

const techBadges = css`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const badge = css`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  transition: all 0.3s;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const navigationLinks = css`
  display: flex;
  gap: 40px;
  margin-top: 60px;
  justify-content: center;
  animation: fadeIn 1s ease-out 1.2s backwards;
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const navButton = css`
  position: relative;
  padding: 15px 40px;
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export default function Dev() {
    const [contentVisible, setContentVisible] = React.useState(true);

    return <div css={centerCss}>
        <Orbit 
          onToggleContent={() => setContentVisible(!contentVisible)}
          contentVisible={contentVisible}
        />
        {contentVisible && (
          <div css={contentCss} style={{ pointerEvents: 'none' }}>
              <div css={heroSection}>
                <h1 css={title}>Matthew James</h1>
                <p css={subtitle}>Full-Stack Developer • Space Enthusiast • Builder</p>
              </div>

              <div css={orbitingCards}>
                <div 
                  css={planetCard} 
                  style={{ 
                    '--glow-color': '#FDB813', 
                    '--glow-color-shadow': 'rgba(253, 184, 19, 0.4)',
                    '--card-color': '#FDB813'
                  }}
                >
                  <div css={cardIcon} style={{ animation: 'orbit 4s linear infinite' }}>💻</div>
                  <h3 css={cardTitle}>Web Developer</h3>
                  <p css={cardContent}>
                    ~3 years of experience crafting modern web applications with a focus on 
                    performance and user experience.
                  </p>
                  <div css={techBadges}>
                    <span css={badge}>React</span>
                    <span css={badge}>JavaScript</span>
                    <span css={badge}>CSS</span>
                    <span css={badge}>Node.js</span>
                    <span css={badge}>Express</span>
                    <span css={badge}>AWS</span>
                  </div>
                </div>

                <div 
                  css={planetCard}
                  style={{ 
                    '--glow-color': '#4169E1',
                    '--glow-color-shadow': 'rgba(65, 105, 225, 0.4)',
                    '--card-color': '#4169E1'
                  }}
                >
                  <div css={cardIcon} style={{ animation: 'orbit 5.3s linear infinite 0.7s' }}>🚀</div>
                  <h3 css={cardTitle}>About Me</h3>
                  <p css={cardContent}>
                    Beyond coding, I have a passion for aviation, space, and construction. I'm currently renovating a 1940's home after work hours. I'm also a huge foody! Cooking and exploring new food is my favorite way to unwind.
                  </p>
                </div>
              </div>

              <div css={navigationLinks}>
                <a 
                  href="/blog" 
                  css={navButton}
                >
                  Blog
                </a>
                <a 
                  href="/projects" 
                  css={navButton}
                >
                  Projects
                </a>
              </div>
          </div>
        )}
    </div>
}
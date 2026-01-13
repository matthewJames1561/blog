/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRef } from 'react';
import { colors, spacing, typography, transitions, gradients, breakpoints } from '../../theme';

const containerCss = css`
  position: relative;
  padding: ${spacing['4xl']} ${spacing.md};
`;

const headingCss = css`
  font-size: 8vw;
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.1em;
  justify-content: flex-start;

  @media screen and (max-width: ${breakpoints.mobile}) {
    font-size: 12vw;
  }
`;

const letterCss = css`
  display: inline-block;
  background: ${gradients.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  cursor: default;
  opacity: 0;
  animation: typeReveal 0.1s ease-out forwards, glitchFlicker 0.3s ease-out forwards;

  @keyframes typeReveal {
    0% {
      opacity: 0;
      transform: scale(0.8);
      filter: blur(8px);
    }
    100% {
      opacity: 1;
      transform: scale(1);
      filter: blur(0);
    }
  }

  @keyframes glitchFlicker {
    0%, 100% {
      opacity: 1;
    }
    25% {
      opacity: 0.3;
      transform: translate(-2px, 0);
    }
    50% {
      opacity: 1;
      transform: translate(2px, 0);
    }
    75% {
      opacity: 0.5;
      transform: translate(-1px, 0);
    }
  }
`;

const subtextCss = css`
  font-size: ${typography.fontSize.xl};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.whiteAlpha(0.85)};
  margin-top: ${spacing.xl};
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out 1.2s forwards;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -5px;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, ${colors.gold}, ${colors.pink}, transparent);
    transform: scaleX(0);
    transform-origin: left;
    animation: lineGrow 1s ease-out 1.5s forwards;
  }

  @keyframes lineGrow {
    to {
      transform: scaleX(1);
    }
  }
`;

export default function InteractiveGreeting() {
  const containerRef = useRef(null);

  const text = "Hi. I'm Matthew";
  const letters = text.split('').map((char, index) => {
    const style = {
      animationDelay: `${index * 0.08}s`
    };

    if (char === ' ') {
      return <span key={index} style={style}>&nbsp;</span>;
    }

    return (
      <span key={index} css={letterCss} style={style}>
        {char}
      </span>
    );
  });

  return (
    <div ref={containerRef} css={containerCss}>
      <h1 css={headingCss}>
        {letters}
      </h1>
      <p css={subtextCss}>
        I'm a web developer, husband, and aspiring homesteader. This is my online play space.
      </p>
    </div>
  );
}

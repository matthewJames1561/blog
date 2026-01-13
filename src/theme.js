import { css } from '@emotion/react';

// Color palette
export const colors = {
  // Primary colors
  gold: '#FDB813',
  pink: '#FF69B4',
  blue: '#4169E1',

  // Background colors
  darkPurple: '#120929',
  darkestPurple: '#0a0a1a',

  // Accent colors
  purple: '#8B5CF6',
  amber: '#F59E0B',
  green: '#10B981',
  cyan: '#06B6D4',
  red: '#EF4444',

  // Neutral colors
  white: '#fcfffd',
  whiteAlpha: (opacity) => `rgba(255, 255, 255, ${opacity})`,
  blackAlpha: (opacity) => `rgba(0, 0, 0, ${opacity})`,
};

// Gradients
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.gold}, ${colors.pink}, ${colors.blue})`,
  subtle: `linear-gradient(135deg, ${colors.darkPurple} 0%, rgba(18, 9, 41, 0.95) 100%)`,
  glow: `radial-gradient(circle, rgba(253, 184, 19, 0.15) 0%, transparent 70%)`,
};

// Spacing scale (8px base)
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
  '4xl': '40px',
  '5xl': '60px',
};

// Border radius scale
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
};

// Typography
export const typography = {
  fontFamily: "'Raleway', sans-serif",
  fontSize: {
    xs: '0.75rem',
    sm: '0.85rem',
    base: '1rem',
    lg: '1.05rem',
    xl: '1.2rem',
    '2xl': '1.5rem',
    '3xl': '2rem',
    '4xl': '3rem',
    '5xl': '4rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },
};

// Shadows
export const shadows = {
  sm: '0 2px 8px rgba(0, 0, 0, 0.1)',
  md: '0 4px 12px rgba(0, 0, 0, 0.15)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.2)',
  xl: '0 12px 32px rgba(0, 0, 0, 0.25)',
  glow: `0 0 20px ${colors.whiteAlpha(0.1)}`,
  glowHover: (color) => `0 0 30px ${color}, 0 10px 40px rgba(0, 0, 0, 0.3)`,
};

// Transitions
export const transitions = {
  fast: 'all 0.2s ease',
  normal: 'all 0.3s ease',
  slow: 'all 0.4s ease',
  bouncy: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  bouncySlow: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// Breakpoints
export const breakpoints = {
  mobile: '800px',
};

// Common card styles
export const cardStyles = css`
  background: ${colors.blackAlpha(0.4)};
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  transition: ${transitions.bouncySlow};

  &:hover {
    transform: translateY(-10px);
    box-shadow: ${shadows.xl};
  }
`;

// Common button styles
export const buttonStyles = css`
  padding: ${spacing.md} ${spacing['2xl']};
  background: ${colors.whiteAlpha(0.05)};
  border: 1px solid ${colors.whiteAlpha(0.2)};
  border-radius: ${radius.md};
  color: ${colors.white};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: ${transitions.normal};

  &:hover {
    background: ${colors.whiteAlpha(0.1)};
    border-color: ${colors.whiteAlpha(0.4)};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Tech badge styles
export const badgeStyles = css`
  display: inline-block;
  padding: ${spacing.xs} ${spacing.md};
  background: ${colors.whiteAlpha(0.1)};
  border: 1px solid ${colors.whiteAlpha(0.2)};
  border-radius: ${radius.full};
  font-size: ${typography.fontSize.sm};
  color: ${colors.whiteAlpha(0.9)};
  transition: ${transitions.normal};

  &:hover {
    background: ${colors.whiteAlpha(0.2)};
    transform: scale(1.05);
  }
`;

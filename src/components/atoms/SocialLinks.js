/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors, spacing, transitions, radius } from '../../theme';

const socialLinksCss = css`
  display: flex;
  gap: ${spacing.md};
  align-items: center;
`;

const socialLinkCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${radius.md};
  background: ${colors.whiteAlpha(0.05)};
  border: 1px solid ${colors.whiteAlpha(0.2)};
  color: ${colors.whiteAlpha(0.7)};
  text-decoration: none;
  transition: ${transitions.bouncy};
  font-size: 18px;

  &:hover {
    background: ${colors.whiteAlpha(0.1)};
    border-color: ${colors.gold};
    color: ${colors.gold};
    transform: translateY(-3px);
    box-shadow: 0 0 20px ${colors.gold}40;
  }

  &:active {
    transform: translateY(-1px);
  }
`;

export default function SocialLinks({ links = [] }) {
  // Default social media platforms if none provided
  const defaultLinks = [
    { name: 'GitHub', url: 'https://github.com/matthewJames1561', icon: '💻' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/matthew-james-b784851ba/', icon: '💼' },
    { name: 'Email', url: 'mailto:matthewj1561@gmail.com', icon: '✉️' }
  ];

  const socialLinks = links.length > 0 ? links : defaultLinks;

  return (
    <div css={socialLinksCss}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          css={socialLinkCss}
          target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
          rel="noopener noreferrer"
          title={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
}

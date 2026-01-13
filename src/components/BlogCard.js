/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors, spacing, radius, typography, transitions, shadows } from '../theme';

const cardCss = css`
  font-size: ${typography.fontSize.base};
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, ${colors.darkPurple} 0%, rgba(18, 9, 41, 0.95) 100%);
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  overflow: hidden;
  text-decoration: none;
  transition: ${transitions.bouncySlow};
  box-shadow: ${shadows.md};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: ${colors.gold};
    border-radius: ${radius.xl};
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${colors.blue};
    box-shadow: ${shadows.glowHover(colors.blue)};

    &::before {
      opacity: 0.2;
    }
  }

  &:hover .card-image {
    transform: scale(1.05);
  }

  &:hover h2 {
    color: ${colors.gold};
  }
`;

const imageCss = css`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, ${colors.blackAlpha(0.3)} 100%);
  }
`;

const contentCss = css`
  padding: ${spacing.xl};
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

const titleCss = css`
  font-size: ${typography.fontSize['2xl']};
  margin: 0;
  font-weight: ${typography.fontWeight.semibold};
  line-height: ${typography.lineHeight.tight};
  transition: color 0.3s ease;
  color: ${colors.white};
`;

const descriptionCss = css`
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  opacity: 0.9;
  color: ${colors.whiteAlpha(0.85)};
  margin: 0;
`;

export default function BlogCard({ title, fromEdit = false, id, thumbnail, description }) {
  return (
    <a css={cardCss} href={fromEdit ? `/create/${id}`: `/blog/${id}`}>
      <div
        css={imageCss}
        className="card-image"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />
      <div css={contentCss}>
        <h2 css={titleCss}>{title}</h2>
        <p css={descriptionCss}>
          {description?.substring(0, 100)}...
        </p>
      </div>
    </a>
  );
}
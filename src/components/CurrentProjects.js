/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors, spacing, typography, radius, transitions, shadows, gradients } from '../theme';

const containerCss = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing['5xl']} ${spacing.xl};
  background: ${colors.blackAlpha(0.2)};
  border-top: 2px solid ${colors.whiteAlpha(0.1)};
`;

const titleCss = css`
  text-align: center;
  margin-bottom: ${spacing['4xl']};

  h2 {
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.bold};
    background: ${gradients.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${spacing.md};
  }

  p {
    font-size: ${typography.fontSize.xl};
    color: ${colors.whiteAlpha(0.7)};
  }
`;

const projectsGridCss = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing['3xl']};
  margin-top: ${spacing['3xl']};
`;

const projectCardCss = css`
  background: linear-gradient(135deg, ${colors.darkPurple} 0%, rgba(18, 9, 41, 0.95) 100%);
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  padding: ${spacing['3xl']};
  transition: ${transitions.bouncySlow};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, transparent, var(--glow-color), transparent);
    border-radius: ${radius.xl};
    opacity: 0;
    transition: opacity 0.3s;
    z-index: -1;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: var(--glow-color);
    box-shadow: ${shadows.xl}, 0 0 40px var(--glow-color-shadow);

    &::before {
      opacity: 0.3;
    }
  }

  .icon {
    font-size: 3rem;
    margin-bottom: ${spacing.lg};
    display: inline-block;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  h3 {
    font-size: ${typography.fontSize['2xl']};
    font-weight: ${typography.fontWeight.semibold};
    color: var(--title-color);
    margin-bottom: ${spacing.md};
  }

  p {
    font-size: ${typography.fontSize.base};
    line-height: ${typography.lineHeight.relaxed};
    color: ${colors.whiteAlpha(0.8)};
    margin-bottom: ${spacing.lg};
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: ${spacing.sm};
    padding: ${spacing.xs} ${spacing.md};
    background: ${colors.whiteAlpha(0.1)};
    border-radius: ${radius.full};
    font-size: ${typography.fontSize.sm};
    color: ${colors.whiteAlpha(0.9)};

    &::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--status-color);
      animation: pulse-status 2s ease-in-out infinite;
    }

    @keyframes pulse-status {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  }
`;

// Current projects data (customize this!)
const currentProjects = [
  {
    icon: "🏠",
    title: "1940s Home Renovation",
    description: "Restoring and modernizing a previously termite-infested home. Learning construction, design, and project management along the way.",
    status: "In Progress",
    statusColor: colors.gold,
    glowColor: colors.gold,
    glowShadow: "rgba(253, 184, 19, 0.4)"
  },
  {
    icon: "💻",
    title: "Personal Blog Platform",
    description: "Building this full-featured blog with React, Firebase, and modern web technologies. Features authentication, email notifications, and markdown support.",
    status: "Active",
    statusColor: colors.pink,
    glowColor: colors.pink,
    glowShadow: "rgba(255, 105, 180, 0.4)"
  },
];

export default function CurrentProjects() {
  return (
    <div css={containerCss}>
      <div css={titleCss}>
        <h2>What I'm Working On</h2>
        <p>Current projects and activities keeping me busy</p>
      </div>

      <div css={projectsGridCss}>
        {currentProjects.map((project, index) => (
          <div
            key={index}
            css={projectCardCss}
            style={{
              '--glow-color': project.glowColor,
              '--glow-color-shadow': project.glowShadow,
              '--title-color': project.glowColor,
              '--status-color': project.statusColor
            }}
          >
            <div className="icon">{project.icon}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="status">{project.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

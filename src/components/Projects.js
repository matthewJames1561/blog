/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Reveal from './atoms/Reveal';
import { colors, spacing, radius, typography, transitions, shadows, gradients } from '../theme';

const containerCss = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: ${spacing['5xl']} ${spacing.xl} ${spacing['4xl']};
  overflow: visible;

  @media screen and (max-width: 800px) {
    padding: ${spacing['3xl']} ${spacing.md};
  }
`;

const headerCss = css`
  text-align: center;
  margin-bottom: ${spacing['5xl']};

  @media screen and (max-width: 800px) {
    margin-bottom: ${spacing['3xl']};
  }

  h1 {
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.bold};
    background: ${gradients.primary};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${spacing.md};
    padding: 0 ${spacing.md};
    line-height: ${typography.lineHeight.tight};

    @media screen and (max-width: 800px) {
      font-size: ${typography.fontSize['3xl']};
    }
  }

  p {
    font-size: ${typography.fontSize.xl};
    color: ${colors.whiteAlpha(0.7)};

    @media screen and (max-width: 800px) {
      font-size: ${typography.fontSize.lg};
    }
  }
`;

const projectsGrid = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${spacing['3xl']};
  margin-top: ${spacing['4xl']};
  padding-top: ${spacing.xl};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: ${spacing.xl};
    margin-top: ${spacing.xl};
  }
`;

const projectCard = css`
  background: ${colors.blackAlpha(0.4)};
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  padding: 0;
  overflow: hidden;
  transition: ${transitions.bouncySlow};
  position: relative;

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
      opacity: 0.5;
    }

    img {
      transform: scale(1.05);
    }
  }
`;

const projectImage = css`
  width: 100%;
  height: 220px;
  object-fit: cover;
  background: linear-gradient(135deg, ${colors.gold}33, ${colors.pink}33);
  transition: transform 0.4s ease;
`;

const projectContent = css`
  padding: ${spacing['2xl']};
`;

const projectTitle = css`
  font-size: ${typography.fontSize['2xl']};
  font-weight: ${typography.fontWeight.semibold};
  color: var(--title-color);
  margin: 0 0 ${spacing.md} 0;
`;

const projectDescription = css`
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.whiteAlpha(0.8)};
  margin-bottom: ${spacing.xl};
`;

const techStack = css`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.xl};
`;

const techBadge = css`
  background: ${colors.whiteAlpha(0.1)};
  border: 1px solid ${colors.whiteAlpha(0.2)};
  padding: ${spacing.xs} ${spacing.md};
  border-radius: ${radius.full};
  font-size: ${typography.fontSize.sm};
  color: ${colors.whiteAlpha(0.9)};
  transition: ${transitions.normal};

  &:hover {
    background: ${colors.whiteAlpha(0.2)};
    transform: scale(1.05);
  }
`;

const projectLinks = css`
  display: flex;
  gap: ${spacing.lg};
  padding-top: ${spacing.lg};
  border-top: 1px solid ${colors.whiteAlpha(0.1)};
`;

const projectLink = css`
  padding: ${spacing.md} ${spacing.xl};
  background: ${colors.whiteAlpha(0.05)};
  border: 1px solid ${colors.whiteAlpha(0.2)};
  border-radius: ${radius.sm};
  color: ${colors.white};
  text-decoration: none;
  font-size: ${typography.fontSize.base};
  transition: ${transitions.normal};

  &:hover {
    background: ${colors.whiteAlpha(0.1)};
    border-color: var(--glow-color);
    transform: translateY(-2px);
  }
`;

const projects = [
  {
    title: "Personal Blog",
    description: "A full-featured blog platform with markdown support, Firebase authentication, and automated email notifications to subscribers. Includes admin dashboard for managing drafts and published posts.",
    image: null,
    technologies: ["React", "Firebase", "Emotion", "EmailJS", "Markdown"],
    liveUrl: "https://blog-b4a6c.web.app/",
    githubUrl: "https://github.com/matthewj1561/blog",
    color: "#FDB813",
    shadowColor: "rgba(253, 184, 19, 0.4)"
  },
  {
    title: "GigHub",
    description: "Platform connecting musicians with event organizers. Features gig management, scheduling, and discovery to help artists find performance opportunities.",
    image: null,
    technologies: ["JavaScript", "Node.js", "Express"],
    liveUrl: 'https://gighub-efe54.web.app/',
    githubUrl: "https://github.com/matthewj1561/gighub",
    color: "#F59E0B",
    shadowColor: "rgba(245, 158, 11, 0.4)"
  },
  {
    title: "Finance Tracker",
    description: "Full-stack personal finance application with TypeScript frontend and C# backend. Track expenses, income, and budgets with detailed analytics and reporting.",
    image: null,
    technologies: ["TypeScript", "React", "C#", ".NET"],
    liveUrl: null,
    githubUrl: "https://github.com/matthewj1561/financeTracker",
    color: "#8B5CF6",
    shadowColor: "rgba(139, 92, 246, 0.4)"
  },
  {
    title: "Inventory Manager",
    description: "Cloud-based inventory management system for businesses. Track products, manage stock levels, and generate reports with a modern Java-based interface.",
    image: null,
    technologies: ["Java", "Cloud Database", "REST API"],
    liveUrl: null,
    githubUrl: "https://github.com/matthewj1561/InventoryManager",
    color: "#4169E1",
    shadowColor: "rgba(65, 105, 225, 0.4)"
  }
];

export default function Projects() {
  return (
    <div css={containerCss}>
      <Reveal>
        <div css={headerCss}>
          <h1>My Projects</h1>
          <p>A collection of things I've built and launched</p>
        </div>
      </Reveal>

      <div css={projectsGrid}>
        {projects.map((project, index) => (
          <Reveal key={index} allowOverflow={true}>
            <div
              css={projectCard}
              style={{
                '--glow-color': project.color,
                '--glow-color-shadow': project.shadowColor,
                '--title-color': project.color
              }}
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  css={projectImage}
                />
              )}

              <div css={projectContent}>
                <h3 css={projectTitle}>{project.title}</h3>
                <p css={projectDescription}>{project.description}</p>

                <div css={techStack}>
                  {project.technologies.map((tech, i) => (
                    <span key={i} css={techBadge}>{tech}</span>
                  ))}
                </div>

                <div css={projectLinks}>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      css={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      css={projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

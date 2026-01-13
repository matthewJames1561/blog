/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect, useRef } from 'react';
import { colors, spacing, typography, radius, transitions, shadows } from '../theme';

// Life journey locations
const locations = [
  {
    id: 1,
    city: "Elk Grove, CA",
    period: "2002 - 2010",
    x: 8,
    y: 40,
    description: "I was born the 9th child of 10. My mother had a home birth in the same house my grandfather built himself. Early childhood memories are a bit fuzzy, but I remember a lot of family time and warm summers.",
    activities: ["Bike Riding", "Spiderman", "BlockBuster"]
  },
  {
    id: 2,
    city: "Wells, Nevada",
    period: "2010-2020",
    x: 17,
    y: 33,
    description: "My family moved to rural Nevada for a work opportunity. The majority of my adolescence was spent here. I was able to work on a local ranch during the summers. My brother exposed me to hobby electronics at this time, and I wrote my first lines of code for an Arduino I got for Christmas.",
    activities: ["School Basketball", "Ranching", "Cross Country"]
  },
  {
    id: 3,
    city: "Rexburg, Idaho",
    period: "2020-2022",
    x: 23,
    y: 28,
    description: "After high school, I moved to Rexburg to attend BYU-Idaho. I began studies in Software Engineering and loved every second. It is here where I met my beautiful wife. We were married within 7 months of meeting each other!", 
    activities: ["Marriage", "Engineering", "Marriage"]
  },
  {
    id: 4,
    city: "Saratoga Springs, UT",
    period: "2023",
    x: 22,
    y: 39,
    description: "I was given an internship at Family Search, which had an office in Lehi, Utah. Fortunately, my wife's family lived nearby, so we spent 4 months in Utah for the internship. Most employees were working remotely, so the office was like a ghost town!",
    activities: ["Learning", "Industry Experience", "Family"]
  },
  {
    id: 5,
    city: "Rexburg, Idaho",
    period: "2023",
    x: 23,
    y: 28,
    description: "After the internship was completed, I was given a full-time offer and could work remotely! We returned to Rexburg so my wife could continue with her schooling. In summer of 2023, I graduated with my Bachelor's in Software Engineering.",
    activities: ["Married Life!", "Graduation"]
  },
  {
    id: 6,
    city: "Beckley, WV",
    period: "2024 - Present",
    x: 72,
    y: 44,
    description: "After finishing out a another year in Rexburg, my wife and I wanted to find a house to own. We were priced out of the market were we lived, so we branched out. I was accepted into the WV Ascend program which incentivises remote workers to move to the state. It's been a roller coaster, but we've learned so much. We are currently renovating an old 1947 house as we anxiously await our first child.",
    activities: ["New Everything", "Homeowners", "Rapid Person Growth"]
  }
];

const containerCss = css`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${spacing['4xl']} ${spacing['4xl']} ${spacing['4xl']};
`;

const contentWrapperCss = css`
  display: flex;
  gap: ${spacing['3xl']};
  align-items: flex-start;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const titleCss = css`
  text-align: center;
  margin-bottom: ${spacing.xl};

  h2 {
    font-size: ${typography.fontSize['4xl']};
    font-weight: ${typography.fontWeight.bold};
    background: linear-gradient(135deg, ${colors.gold}, ${colors.pink}, ${colors.blue});
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

const mapContainerCss = css`
  position: relative;
  width: 100%;
  max-width: 800px;
  flex: 1;
  padding: ${spacing['2xl']};
  background: ${colors.blackAlpha(0.3)};
  border: 2px solid ${colors.whiteAlpha(0.1)};
  border-radius: ${radius.xl};
  box-shadow: ${shadows.lg};

  @media (max-width: 800px) {
    margin: 0 auto ${spacing['3xl']};
  }
`;

const mapImageCss = css`
  width: 100%;
  height: auto;
  opacity: 0.3;
  filter: brightness(0.6) drop-shadow(0 4px 8px ${colors.blackAlpha(0.3)});
`;

const locationMarkerCss = css`
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid ${colors.white};
  cursor: pointer;
  transition: ${transitions.bouncy};
  z-index: 2;

  &.active {
    width: 30px;
    height: 30px;
    margin-left: -5px;
    margin-top: -5px;
    box-shadow: 0 0 30px currentColor;
    animation: pulse-marker 2s ease-in-out infinite;
  }

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 20px currentColor;
  }

  @keyframes pulse-marker {
    0%, 100% {
      box-shadow: 0 0 20px currentColor;
    }
    50% {
      box-shadow: 0 0 40px currentColor;
    }
  }
`;

const pathLinesCss = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;

  @media (max-width: 800px) {
    display: none;
  }

  path.active {
    fill: none;
    stroke: ${colors.pink};
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    filter: drop-shadow(0 0 4px ${colors.pink})
            drop-shadow(0 0 6px ${colors.blue}80);
    animation: glow-pulse 2s ease-in-out infinite;
    marker-end: url(#arrowhead);
  }

  path.active.animating {
    stroke-dasharray: 1000;
    stroke-dashoffset: 1000;
    animation: draw-line 40s ease-out forwards, glow-pulse 2s ease-in-out infinite 3.5s;
  }

  @keyframes draw-line {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes glow-pulse {
    0%, 100% {
      filter: drop-shadow(0 0 4px ${colors.pink})
              drop-shadow(0 0 6px ${colors.blue}80);
    }
    50% {
      filter: drop-shadow(0 0 6px ${colors.pink})
              drop-shadow(0 0 8px ${colors.blue});
    }
  }
`;

const storyCardCss = css`
  background: linear-gradient(135deg, ${colors.darkPurple} 0%, rgba(18, 9, 41, 0.95) 100%);
  border: 2px solid ${colors.whiteAlpha(0.2)};
  border-radius: ${radius.xl};
  padding: ${spacing['3xl']};
  flex: 1;
  box-shadow: ${shadows.xl};
  animation: slideUp 0.5s ease-out;

  @media (max-width: 800px) {
    margin-top: ${spacing['3xl']};
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  h3 {
    font-size: ${typography.fontSize['3xl']};
    font-weight: ${typography.fontWeight.bold};
    color: ${colors.gold};
    margin-bottom: ${spacing.sm};
  }

  .period {
    font-size: ${typography.fontSize.lg};
    color: ${colors.pink};
    margin-bottom: ${spacing.xl};
    font-weight: ${typography.fontWeight.medium};
  }

  .description {
    font-size: ${typography.fontSize.xl};
    line-height: ${typography.lineHeight.relaxed};
    color: ${colors.whiteAlpha(0.85)};
    margin-bottom: ${spacing.xl};
  }

  .activities-header {
    font-size: ${typography.fontSize.sm};
    font-weight: ${typography.fontWeight.semibold};
    color: ${colors.whiteAlpha(0.6)};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: ${spacing.sm};
  }

  .activities {
    display: flex;
    flex-wrap: wrap;
    gap: ${spacing.sm};

    span {
      padding: ${spacing.xs} ${spacing.md};
      background: ${colors.whiteAlpha(0.1)};
      border: 1px solid ${colors.whiteAlpha(0.2)};
      border-radius: ${radius.full};
      font-size: ${typography.fontSize.sm};
      color: ${colors.whiteAlpha(0.9)};
    }
  }
`;

const navigationHintCss = css`
  text-align: center;
  margin-top: ${spacing.xl};
  font-size: ${typography.fontSize.base};
  color: ${colors.whiteAlpha(0.6)};

  span {
    display: inline-block;
    padding: ${spacing.xs} ${spacing.md};
    background: ${colors.whiteAlpha(0.1)};
    border-radius: ${radius.sm};
    margin: 0 ${spacing.xs};
    font-family: monospace;
  }
`;

const navigationControlsCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing.lg};
  margin-top: ${spacing.lg};
`;

const navButtonCss = (disabled) => css`
  padding: ${spacing.md} ${spacing.xl};
  background: ${disabled ? colors.whiteAlpha(0.05) : colors.whiteAlpha(0.1)};
  border: 2px solid ${disabled ? colors.whiteAlpha(0.1) : colors.whiteAlpha(0.3)};
  border-radius: ${radius.lg};
  color: ${disabled ? colors.whiteAlpha(0.3) : colors.whiteAlpha(0.9)};
  font-size: ${typography.fontSize.xl};
  cursor: ${disabled ? 'not-allowed' : 'pointer'};
  transition: ${transitions.smooth};
  display: flex;
  align-items: center;
  gap: ${spacing.sm};

  &:hover {
    ${!disabled && `
      background: ${colors.whiteAlpha(0.2)};
      border-color: ${colors.pink};
      transform: scale(1.05);
      box-shadow: 0 0 20px ${colors.pink}40;
    `}
  }

  &:active {
    ${!disabled && `
      transform: scale(0.98);
    `}
  }
`;

export default function LifeJourneyMap() {
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const previousLocationIndex = useRef(0);
  const currentLocation = locations[currentLocationIndex];

  useEffect(() => {
    previousLocationIndex.current = currentLocationIndex;
  }, [currentLocationIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentLocationIndex((prev) =>
          prev < locations.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentLocationIndex((prev) =>
          prev > 0 ? prev - 1 : prev
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePrevious = () => {
    setCurrentLocationIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentLocationIndex((prev) => (prev < locations.length - 1 ? prev + 1 : prev));
  };

  const generatePathSegments = () => {
    const segments = [];
    const isMovingForward = currentLocationIndex > previousLocationIndex.current;

    for (let i = 0; i < currentLocationIndex; i++) {
      const from = locations[i];
      const to = locations[i + 1];

      segments.push({
        key: `${i}-${i + 1}`,
        path: `M ${from.x} ${from.y} L ${to.x} ${to.y}`,
        isNew: isMovingForward && i === currentLocationIndex - 1 // Only animate when moving forward
      });
    }
    return segments;
  };

  return (
    <div css={containerCss}>
      <div css={titleCss}>
        <h2>My Journey</h2>
        <p>Navigate through my life story across the United States</p>
      </div>

      <div css={contentWrapperCss}>
        <div css={mapContainerCss}>
          {/* US Map Background */}
          <img
            css={mapImageCss}
            src="/map.svg"
            alt="US Map"
          />

          {/* Journey Path Lines */}
          <svg css={pathLinesCss} viewBox="-2 0 99 92" preserveAspectRatio="none" >
            {/* Active path segments (glowing) - one arrow per segment */}
            {generatePathSegments().map((segment) => (
              <path
                key={segment.key}
                d={segment.path}
                className={segment.isNew ? "active animating" : "active"}
              />
            ))}
          </svg>

          {/* Location Markers */}
          {locations.map((location, index) => (
            <div
              key={location.id}
              css={locationMarkerCss}
              className={index === currentLocationIndex ? 'active' : ''}
              style={{
                left: `${location.x}%`,
                top: `${location.y}%`,
                backgroundColor: index <= currentLocationIndex ? colors.gold : colors.whiteAlpha(0.3),
                borderColor: index === currentLocationIndex ? colors.pink : colors.whiteAlpha(0.5),
              }}
              onClick={() => setCurrentLocationIndex(index)}
            />
          ))}
        </div>

        {/* Story Card */}
        <div css={storyCardCss} key={currentLocation.id}>
          <h3>{currentLocation.city}</h3>
          <div className="period">{currentLocation.period}</div>
          <p className="description">{currentLocation.description}</p>
          <div className="activities-header">Highlights</div>
          <div className="activities">
            {currentLocation.activities.map((activity, i) => (
              <span key={i}>{activity}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Hint */}
      <div css={navigationHintCss}>
        Use <span>←</span> <span>→</span> arrow keys or buttons below to navigate •
        {currentLocationIndex + 1} of {locations.length}
      </div>

      {/* Navigation Buttons */}
      <div css={navigationControlsCss}>
        <button
          css={navButtonCss(currentLocationIndex === 0)}
          onClick={handlePrevious}
          disabled={currentLocationIndex === 0}
          aria-label="Previous location"
        >
          ← Previous
        </button>
        <button
          css={navButtonCss(currentLocationIndex === locations.length - 1)}
          onClick={handleNext}
          disabled={currentLocationIndex === locations.length - 1}
          aria-label="Next location"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

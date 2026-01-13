/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { colors } from '../theme';
import InteractiveGreeting from "./atoms/InteractiveGreeting";
import LifeJourneyMap from "./LifeJourneyMap";
import CurrentProjects from "./CurrentProjects";
import Spinner from "./atoms/Spinner";

const splashScreenCss = (isVisible) => css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${colors.darkPurple};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: ${isVisible ? 1 : 0};
  transition: opacity 0.6s ease-out;
  pointer-events: ${isVisible ? 'all' : 'none'};
`;

const contentCss = css`
  opacity: 0;
  animation: fadeInContent 0.6s ease-out forwards;

  @keyframes fadeInContent {
    to {
      opacity: 1;
    }
  }
`;

function Home() {
  const [animationPhase, setAnimationPhase] = useState('loading'); // 'loading', 'conglomerate', 'explode', 'complete'
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Phase 1: Loading (1.2 seconds)
    const conglomerateTimer = setTimeout(() => {
      setAnimationPhase('conglomerate');

      // Phase 2: Conglomerate (0.5 seconds)
      setTimeout(() => {
        setAnimationPhase('explode');
        setShowContent(true);

        // Phase 3: Explode and complete (0.7 seconds)
        setTimeout(() => {
          setAnimationPhase('complete');
        }, 700);
      }, 500);
    }, 1200);

    return () => clearTimeout(conglomerateTimer);
  }, []);

  return (
    <div>
      {/* Splash Screen */}
      {animationPhase !== 'complete' && (
        <div css={splashScreenCss(animationPhase === 'loading' || animationPhase === 'conglomerate')}>
          <Spinner animationPhase={animationPhase} />
        </div>
      )}

      {/* Main Content */}
      {showContent && (
        <div css={contentCss}>
          <InteractiveGreeting />
          <LifeJourneyMap />
          <CurrentProjects />
        </div>
      )}
    </div>
  );
}

export default Home;

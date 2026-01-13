/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { colors } from '../../theme';

const spinnerWrapperCss = css`
    width: 100%;
    height: calc(var(--main-height) - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const loaderCss = (animationPhase) => css`
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(${animationPhase === 'conglomerate' ? 0 : 1});
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.6, 1);
`;

const coreCss = (animationPhase) => css`
    position: absolute;
    width: 30px;
    height: 30px;
    background: linear-gradient(135deg, ${colors.gold}, ${colors.pink}, ${colors.blue});
    border-radius: 50%;
    box-shadow:
        0 0 20px ${colors.gold}80,
        0 0 40px ${colors.pink}60,
        0 0 60px ${colors.blue}40;
    animation: ${animationPhase === 'loading' ? 'pulse 2s ease-in-out infinite' :
                animationPhase === 'conglomerate' ? 'conglomerateCore 0.5s cubic-bezier(0.4, 0, 0.6, 1) forwards' :
                animationPhase === 'explode' ? 'explodeCore 0.7s ease-out forwards' : 'none'};

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.3);
            opacity: 0.8;
        }
    }

    @keyframes conglomerateCore {
        to {
            transform: scale(2.5);
            box-shadow:
                0 0 40px ${colors.gold},
                0 0 80px ${colors.pink},
                0 0 120px ${colors.blue};
        }
    }

    @keyframes explodeCore {
        to {
            transform: scale(15);
            opacity: 0;
        }
    }
`;

const orbitRingCss = (animationPhase) => css`
    position: absolute;
    border: 2px solid ${colors.whiteAlpha(0.1)};
    border-radius: 50%;
    opacity: ${animationPhase === 'loading' ? 1 : 0};
    transition: opacity 0.5s ease-out;

    &.ring-1 {
        width: 60px;
        height: 60px;
        animation: rotate 3s linear infinite;
    }

    &.ring-2 {
        width: 90px;
        height: 90px;
        animation: rotate 4s linear infinite reverse;
    }

    &.ring-3 {
        width: 120px;
        height: 120px;
        animation: rotate 5s linear infinite;
    }

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

const particleCss = (animationPhase) => css`
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: top 0.7s ease-out,
                left 0.7s ease-out,
                right 0.7s ease-out,
                bottom 0.7s ease-out,
                transform 0.7s ease-out,
                opacity 0.7s ease-out;

    &.particle-1 {
        background: ${colors.gold};
        box-shadow: 0 0 10px ${colors.gold};
        top: ${animationPhase === 'explode' ? '-100vh' : '0'};
        left: 50%;
        animation: ${animationPhase === 'explode' ? 'none' : 'orbit-1 3s linear infinite'};
        transform: ${animationPhase === 'explode' ? 'translate(-50%, -50%) scale(3)' : 'translateX(-50%)'};
        opacity: ${animationPhase === 'explode' ? 0 : 1};
    }

    &.particle-2 {
        background: ${colors.pink};
        box-shadow: 0 0 10px ${colors.pink};
        top: ${animationPhase === 'explode' ? '50%' : '50%'};
        right: ${animationPhase === 'explode' ? 'auto' : '0'};
        left: ${animationPhase === 'explode' ? '200vw' : 'auto'};
        animation: ${animationPhase === 'explode' ? 'none' : 'orbit-2 4s linear infinite'};
        transform: ${animationPhase === 'explode' ? 'translate(-50%, -50%) scale(3)' : 'translateY(-50%)'};
        opacity: ${animationPhase === 'explode' ? 0 : 1};
    }

    &.particle-3 {
        background: ${colors.blue};
        box-shadow: 0 0 10px ${colors.blue};
        bottom: ${animationPhase === 'explode' ? 'auto' : '0'};
        top: ${animationPhase === 'explode' ? '200vh' : 'auto'};
        left: 50%;
        animation: ${animationPhase === 'explode' ? 'none' : 'orbit-3 5s linear infinite'};
        transform: ${animationPhase === 'explode' ? 'translate(-50%, -50%) scale(3)' : 'translateX(-50%)'};
        opacity: ${animationPhase === 'explode' ? 0 : 1};
    }

    &.particle-4 {
        background: ${colors.purple};
        box-shadow: 0 0 10px ${colors.purple};
        top: 50%;
        left: ${animationPhase === 'explode' ? '-100vw' : '0'};
        animation: ${animationPhase === 'explode' ? 'none' : 'orbit-1 3.5s linear infinite'};
        transform: ${animationPhase === 'explode' ? 'translate(-50%, -50%) scale(3)' : 'translateY(-50%)'};
        opacity: ${animationPhase === 'explode' ? 0 : 1};
    }

    @keyframes orbit-1 {
        from {
            transform: translateX(-50%) rotate(0deg) translateX(30px) rotate(0deg);
        }
        to {
            transform: translateX(-50%) rotate(360deg) translateX(30px) rotate(-360deg);
        }
    }

    @keyframes orbit-2 {
        from {
            transform: translateY(-50%) rotate(0deg) translateX(45px) rotate(0deg);
        }
        to {
            transform: translateY(-50%) rotate(-360deg) translateX(45px) rotate(360deg);
        }
    }

    @keyframes orbit-3 {
        from {
            transform: translateX(-50%) rotate(0deg) translateX(60px) rotate(0deg);
        }
        to {
            transform: translateX(-50%) rotate(360deg) translateX(60px) rotate(-360deg);
        }
    }

    /* Conglomerate animations - particles move to center */
    @keyframes conglomerateParticle-1 {
        to {
            transform: translateX(-50%) translateY(50px) scale(0);
            opacity: 0;
        }
    }

    @keyframes conglomerateParticle-2 {
        to {
            transform: translateY(-50%) translateX(-50px) scale(0);
            opacity: 0;
        }
    }

    @keyframes conglomerateParticle-3 {
        to {
            transform: translateX(-50%) translateY(-50px) scale(0);
            opacity: 0;
        }
    }

    @keyframes conglomerateParticle-4 {
        to {
            transform: translateY(-50%) translateX(50px) scale(0);
            opacity: 0;
        }
    }

    /* Explode animations - particles shoot outward */
    @keyframes explodeParticle-1 {
        from {
            transform: translate(-50%, -50%) scale(0);
            top: 50%;
            left: 50%;
        }
        to {
            transform: translate(-50%, -50%) scale(3);
            top: -100vh;
            left: 50%;
            opacity: 0;
        }
    }

    @keyframes explodeParticle-2 {
        from {
            transform: translate(-50%, -50%) scale(0);
            top: 50%;
            left: 50%;
        }
        to {
            transform: translate(-50%, -50%) scale(3);
            top: 50%;
            left: 200vw;
            opacity: 0;
        }
    }

    @keyframes explodeParticle-3 {
        from {
            transform: translate(-50%, -50%) scale(0);
            top: 50%;
            left: 50%;
        }
        to {
            transform: translate(-50%, -50%) scale(3);
            top: 200vh;
            left: 50%;
            opacity: 0;
        }
    }

    @keyframes explodeParticle-4 {
        from {
            transform: translate(-50%, -50%) scale(0);
            top: 50%;
            left: 50%;
        }
        to {
            transform: translate(-50%, -50%) scale(3);
            top: 50%;
            left: -100vw;
            opacity: 0;
        }
    }
`;

export default function Spinner({centered = false, animationPhase = 'loading'}) {
    return (
        <div css={centered && spinnerWrapperCss}>
            <div css={loaderCss(animationPhase)}>
                {/* Core */}
                <div css={coreCss(animationPhase)}></div>

                {/* Orbit Rings */}
                <div css={orbitRingCss(animationPhase)} className="ring-1"></div>
                <div css={orbitRingCss(animationPhase)} className="ring-2"></div>
                <div css={orbitRingCss(animationPhase)} className="ring-3"></div>

                {/* Particles */}
                <div css={particleCss(animationPhase)} className="particle-1"></div>
                <div css={particleCss(animationPhase)} className="particle-2"></div>
                <div css={particleCss(animationPhase)} className="particle-3"></div>
                <div css={particleCss(animationPhase)} className="particle-4"></div>
            </div>
        </div>
    );
}

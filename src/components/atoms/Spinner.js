/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const hourglassCss = css`
    /* change color here */
    color: var(--dodger-blue);
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    &, &:after {
        box-sizing: border-box;
    }

    &:after {
        content: " ";
        display: block;
        border-radius: 50%;
        width: 0;
        height: 0;
        margin: 8px;
        box-sizing: border-box;
        border: 32px solid currentColor;
        border-color: currentColor transparent currentColor transparent;
        animation: lds-hourglass 1.2s infinite;
    }
    @keyframes lds-hourglass {
        0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }
        50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        }
        100% {
            transform: rotate(1800deg);
        }
    }
`

const spinnerWrapperCss = css`
    width: 100%;
    height: calc(var(--main-height) - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Spinner({centered= false}) {
    return <div css={centered && spinnerWrapperCss}>
        <div css={hourglassCss}></div>
    </div>
}



/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const centerCss = css`
    width: 100%;
    height: calc(var(--main-height) - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Dev() {
    return <div css={centerCss}>
        <h2>🚧🔨 Under construction 🔨🚧</h2>
    </div>
}
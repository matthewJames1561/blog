/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";

const syledButtonCss = css`
    background-color: var(--slate-gray);
    border: none;
    border-radius: 3px;
    color: var(--dark-purple);
    font-size: 20px;
    ::placeholder {
        color: var(--dark-purple);
    }
    width: 50%;
    &[data-full-width] {
        width: 100%;
    }
`

export default function StyledInput({ initialValue = null, label, name, onChange = () => {}, fullWidth = false }) {
    const [value, setValue] = useState(initialValue)

    
    return <div style={{display: 'flex', alignItems: 'center'}}>
        {label && <label for={name} style={fullWidth && {width: '100px'}} >{label}</label>}
        <input 
            css={syledButtonCss} 
            data-full-width={fullWidth}
            className={'padding-10 margin-10'} 
            onChange={(e) => {
                onChange(e.target.value)
                setValue(e.target.value)
            }} 
            name={name} 
            value={value}>
        </input>
    </div>

}
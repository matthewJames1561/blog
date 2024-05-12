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

export default function StyledInput({ initialValue = null, label, name, onChange = () => {}, fullWidth = false, placeholder, type, required = false}) {
    const [value, setValue] = useState(initialValue)

    
    return <div style={{display: 'flex', alignItems: 'center'}}>
        {label && <label for={name} style={fullWidth && {width: '100px'}} >{label}</label>}
        <input 
            css={syledButtonCss} 
            placeholder={placeholder}
            data-full-width={fullWidth}
            className={'padding-10 margin-10'} 
            type={type}
            required={required}
            onChange={(e) => {
                onChange(e.target.value)
                setValue(e.target.value)
            }} 
            name={name} 
            value={value}>
        </input>
    </div>

}
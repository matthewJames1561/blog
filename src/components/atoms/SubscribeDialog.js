/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StyledInput from './StyledInput';
import StyledButton from './StyledButton';
import { useCallback, useRef, useState } from 'react';
import emailjs from '@emailjs/browser'
import CheckMark from './checkMark';
import { saveSubscriber } from '../../firebaseServices';

const OVERLAY_PADDING = 15

const buttonCss = css`
    background-color: transparent;
    color: white; 
    font-size:25px;
    height: fit-content;
    border: none;
    padding: 5px 10px;
    border-radius: 25%;
    transition: all 0.25s;
    &:hover {
        background-color: var(--dodger-blue);
    }
`

const overlayCss = css`
    background-color: var(--dark-purple);
    position: fixed;
    top: 25%;
    left: 25%;
    padding: ${OVERLAY_PADDING}px;
    width: calc(50% - ${OVERLAY_PADDING * 2}px);
    height: calc(50% - ${OVERLAY_PADDING * 2}px);
    color: white; 
    z-index: 2;
    @media screen and (max-width: 800px) {
        left: 10%;
        top: 10%;
        width: calc(80% - ${OVERLAY_PADDING * 2}px);
        height: calc(80% - ${OVERLAY_PADDING * 2}px);
      }
`

const scrimCss = css`
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1;
`

export default function SubscribeDialog({ show, close }) {
    const formRef = useRef()
    const [subscribed, setSubscribed] = useState(false)
    const [subscribeText, setSubscribeText] = useState('Thanks for subscribing!')
    const [isLoading, setIsLoading] = useState(false)
    const subscribe = useCallback(async () => {
        let checkStatus = formRef.current.checkValidity();
        formRef.current.reportValidity();
        if (checkStatus) {
            const formData = new FormData(formRef.current)
            const saveResponse = await saveSubscriber(formData.get('to_email'), { name: formData.get('to_name') })
            if (saveResponse === 'already_saved') {
                setSubscribeText("You've already subscribed. Thanks for subscribing!")
                setSubscribed(true)
                setTimeout(() => {
                    close()
                    setSubscribed(false)
                }, 1500)
            } else {
                setIsLoading(true)
                emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE_ID, 'template_f7e5c09', formRef.current, {
                    publicKey: process.env.REACT_APP_EMAIL_KEY
                }).then(() => {
                setIsLoading(false)
                setSubscribed(true)
                setTimeout(() => {
    
                    close()
                    setSubscribed(false)
                }, 1500)
                }).catch(() => {
                    setIsLoading(false)
                })
            }
        }
    }, [close])
    return show && (<>
        <div css={overlayCss}>
            {!subscribed ? <>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <h1>Subscribe to my newsletter!</h1>
                    <button css={buttonCss} onClick={close}>X</button>
                </div>
                <hr></hr>
                <p style={{ margin: '20px 0' }}>
                    &emsp;Enter your email here and get email notifications each time I publish a new post! Unsubscribe at any time.
                </p>
                <form id='subscribeForm' ref={formRef} style={{ display: 'flex', flexDirection: 'column' }}>
                    <StyledInput placeholder={'Your Name'} required name='to_name'></StyledInput>
                    <StyledInput placeholder={'Your Email'} type='email' required name='to_email'></StyledInput>
                    <div className='padding-10'></div>
                    <StyledButton onClick={subscribe} disabled={isLoading}>{isLoading ? 'Loading...': 'Subscribe'}</StyledButton>

                </form>
            </> : <>
                <CheckMark />
                <h2 style={{ textAlign: 'center' }}>{subscribeText}</h2>
            </>}
        </div>
        <div css={scrimCss} onClick={close}></div>
    </>)
}
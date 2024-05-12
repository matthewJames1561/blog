// FirebaseUI
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// React stuff
import { useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

// Auth service
import { auth } from '../firebaseServices'
import { useUser } from './authComponents/AuthProvider';

export default function Login() {
    const [searchParams] = useSearchParams();
    const { user } = useUser()
    const navigate = useNavigate()

    const uiConfig = useMemo(() => ({
        callbacks: {
            signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                // Action if the user is authenticated successfully
            },
            uiShown: function () {
                // This is what should happen when the form is full loaded. In this example, I hide the loader element.
                document.getElementById('loader').style.display = 'none';
            }
        },
        signInSuccessUrl: searchParams.get('returnURL') ? searchParams.get('returnURL') : '/', // This is where should redirect if the sign in is successful.
        signInOptions: [ // This array contains all the ways an user can authenticate in your application. For this example, is only by email.
            {
                provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            }
        ],
    }), [searchParams])

    useEffect(() => {
        if (user) navigate('/')
        else {
            const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

            ui.start('#firebaseui-auth-container', uiConfig);
        }

    }, [navigate, user, uiConfig]);

    return (
        <>
            <h1 className="text-center my-3 title">Login Page</h1>
            <div id="firebaseui-auth-container"></div>
            <div id="loader" className="text-center">Loading form</div>
        </>
    )
}
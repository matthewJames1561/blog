import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../firebaseServices";

const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState('loading')


    onAuthStateChanged(auth, (user) => {
        if (user) setUser(true)
        else setUser(false)
    })

    return <AuthContext.Provider value={{ user }}>
        {children}
    </AuthContext.Provider>
}

export function useUser() {
    const { user } = useContext(AuthContext)
    return { user, loading: user === 'loading' }
}
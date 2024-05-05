import Spinner from "../atoms/Spinner"
import { useUser } from "./AuthProvider"
import { Navigate } from "react-router-dom"

export default function AuthRoute ({children}) {
    const {user, loading} = useUser()
    console.log(user)
    if (loading) {
        return <Spinner centered/>
    }
    if (!user && !loading) {
        return <Navigate to='/login'></Navigate>
    }
    return children
}
import { 
    createContext, 
    useState, 
    useEffect
} from "react"

import { getAuth, onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loggedIn, setLoggedin] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)

    useEffect(() => {
        const auth = getAuth()

        onAuthStateChanged(auth, (user) => {
            if(user) {
                
                setLoggedin(true)
                setUser(user)

            }
            setCheckingStatus(false)
        })

    }, [loggedIn])

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedin,
                checkingStatus,
                user,
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext
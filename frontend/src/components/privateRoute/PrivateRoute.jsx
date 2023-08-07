import {Navigate, Outlet} from 'react-router-dom'

const PriviteRoute = () => {
    const loggedIn = true

    return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}

export default PriviteRoute
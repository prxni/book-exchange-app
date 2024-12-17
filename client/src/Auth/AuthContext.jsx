import { createContext, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { axiosJWT } from "./axios";
// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap your application
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // State to manage the user authentication state
    const [ name, setName ] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [ id, setId ] = useState(null)
    const [ isLoading, setisLoading ] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    const authorize = async () => {
        axiosJWT.get('/user')
        .then(res => {
            console.log(res.data)
            if(res.data.errorCode!=null)
            {
                if(location.pathname!='/') navigate('/', { replace: true })
            }
            else
            {
                setUser(res.data.username)
                setName(res.data.name)
                setId(res.data.id)
            }
            setisLoading(false)
        })
        .catch(err =>{
            console.log('hi')
            navigate('/', { replace: true })
        })
    }

    const context = { id, user, name, isLoading, isLoggedIn, authorize }

    return (
        <AuthContext.Provider value={context}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

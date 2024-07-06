import { createContext, useState } from "react";
import { registerUser, loginUser, verifyToken, logoutUser } from "../config/auth.js";
import { useContext } from "react";
import Cookies from 'js-cookie'
import { useEffect } from "react";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([])

    const signup = async (user) => {
        try {
            const res = await registerUser(user)
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            const res = await loginUser(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    const logout = async () => {
      try {
        const res = await logoutUser()
        setIsAuthenticated(false)
        console.log(res)
      } catch (error) {
        setErrors(error.response.data)
      }
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()
            if (!cookies.token) {
                setIsAuthenticated(false)
                setUser(null);
                Cookies.remove('token')
            }

            try {
                const res = await verifyToken(cookies.token)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setUser(null)
                    
                    return;

                }else{
                    setIsAuthenticated(true);
                    setUser(res.data);
                }
                
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                Cookies.remove('token');
            }
        }

        checkLogin();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signup,
                signin,
                logout,
                user,
                isAuthenticated,
                errors
            }}>
            {children}
        </AuthContext.Provider>
    )
}
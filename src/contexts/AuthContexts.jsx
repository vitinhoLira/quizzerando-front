import { createContext, useEffect, useState } from "react";
import API_URL from "../API.route";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role'))
    const [token, setToken] = useState(localStorage.getItem('auth'))
    const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo'))
    const [userId, setUserId] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setToken(localStorage.getItem('auth'))
        setRole(localStorage.getItem('role'))
        setUserId(localStorage.getItem('user@id'))
        setUserInfo(localStorage.getItem('userInfo'))
    }, [])


    const signIn = async (data) => {
        const response = await fetch(API_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();


        if (response.status === 401) {
            return response.status;
        }
        if (!!responseData.token) {
            localStorage.setItem('auth', responseData.token)
            localStorage.setItem('role', responseData.role)
            localStorage.setItem('user@id', responseData.id)
            setUserId(localStorage.getItem('user@id'))
            setRole(responseData.role)
            setToken(responseData.token)
            return true
        }
    };

    const signOut = (e) => {
        localStorage.clear()
        setRole(null)
        setToken(null);
        navigate('/login')
    };

    return (
        <AuthContext.Provider value={{ signed: !!token, token, signIn, signOut, role, userInfo, userId }}>
            {children}
        </AuthContext.Provider>
    )
}
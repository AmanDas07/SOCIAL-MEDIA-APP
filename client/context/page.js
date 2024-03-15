'use client'
import { createContext, useState, useEffect } from "react";

const userContext = createContext();

const UserProvider = ({ children }) => {
    const [state, setState] = useState({
        user: {}, token: ""
    })
    useEffect(() => {
        setState(window.localStorage.getItem("auth"))
    }, [])
    return (
        <userContext.Provider value={[state, setState]}>
            {children}
        </userContext.Provider>
    )
}

export { userContext, UserProvider }; 
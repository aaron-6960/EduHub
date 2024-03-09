import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const initUser = {
    _id: "",
    username: "",
    name:"",
    college:"",
    semester:"",
    chatgrps: [],
}

const getInitialState = () => {
    const auth = localStorage.getItem('auth')
    return auth ? JSON.parse(auth) : initUser
}

export const AuthContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(getInitialState)
  
    useEffect(() => {
        try {
          const user = JSON.parse(localStorage.getItem("auth"));
          setAuth({ ...auth, user });
        } catch (error) {
          console.error("Error retrieving data:", error);
        }
    },[]);
  
    return (
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    );
  };

export const UserAuth = () => {
    return useContext(AuthContext)
}
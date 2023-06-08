import React, {useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthState = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  let navigate = useNavigate();

  // authTokenStore function is taken in context because this function will be use for login and signup. 
  const authTokenStore = (authToken) => {
    console.log(authToken);
    localStorage.setItem('token', authToken);
    navigate("/");      
    setIsLoggedIn(true) 
  };

  
  return (
    <AuthContext.Provider value={{ authTokenStore, isLoggedIn, setIsLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthState };

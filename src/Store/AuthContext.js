import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userEmail:"",
});

export const AuthContextProvider = (props) => {
  const [userEmail, setUseremail] = useState(localStorage.getItem('email'));

  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    alert("Logged out succesfull");
  };

  const loginHandler = (token,email) => {
    setToken(token);
    setUseremail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };


  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userEmail: userEmail,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
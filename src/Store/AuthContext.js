import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  return {
    token: storedToken,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(null);

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUserIsLoggedIn(false);
    alert("Logged out succesfull");
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setUserIsLoggedIn(true);
  };

  useEffect(() => {
    if (token) {
      setUserIsLoggedIn(true);
    } else {
      setUserIsLoggedIn(false);
    }
  }, [token]);

  console.log(`user login  ${userIsLoggedIn}`);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
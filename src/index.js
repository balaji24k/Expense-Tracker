import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

// import "../node_modules/react-bootstrap/dist/react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.css";


import {AuthContextProvider} from "./Store/AuthContext";

import { Provider } from 'react-redux';
import store from "./Store/store"
console.log(store, "inIndexJs")

const root = ReactDOM.createRoot(document.getElementById('root'));
const DarkOrNot = localStorage.getItem("dark or not") === "true";
console.log(DarkOrNot);

root.render(
  <div className={DarkOrNot ? "dark" : null}>
    <Provider store={store} >
      <AuthContextProvider>
        <BrowserRouter> 
          <App/>
        </BrowserRouter>
      </AuthContextProvider>
    </Provider>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

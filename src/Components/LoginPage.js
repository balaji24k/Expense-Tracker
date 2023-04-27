import React, { useContext, useState, useRef } from "react";
import classes from "./LoginPage.module.css";
import { Button, Form, Nav } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [login, setLogin] = useState(false);

  const ForgotPasswordHandler = () => {
    alert("you may have received an email with reset link");
    console.log(emailInputRef.current.value);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBO-uWvkbDxYCjipLzXz0ZulQvNenR57ww",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailInputRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Login succesfullly");
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            let errorMessage = "Email sent for reset password";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLogin(true);
    authCtx.login();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (enteredEmail === "" || enteredPassword === "") {
      alert("Must fill both Email and Password");
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBO-uWvkbDxYCjipLzXz0ZulQvNenR57ww",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          console.log("Login succesfullly");
          alert("Login succesful");
          history.replace("/WelcomePage");
          return res.json();
        } else {
          return res.json().then((data) => {
            // console.log(data);
            let errorMessage = "Authrntication filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
          });
        }
      }).then((data) => {
        console.log(data);
        // authCtx.login(data.idToken, enteredEmail);
        dispatch(
          authActions.login({ token: data.idToken, email: data.email })
        );
        history.replace("/AddExpenseDetails");
      })
      .catch((err) => {
        alert(err.message);
        setLogin(false);
      });;
    }
  };

  return (
    <section className={classes.Look}>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Email</Form.Label>
          <Form.Control type="text" placeholder="Email" ref={emailInputRef} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "white" }}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>

        <div>
          {!login ? (
              <Button variant="success pl-2" type="submit">
                Login
              </Button>) : (
              <p style={{ color: "white" }}>Loading...</p>
          )}
          <Button
            onClick={ForgotPasswordHandler}
            style={{ color: "white", marginLeft: "1rem", padding: "0.1rem" }}
          >
            Forgot Password?
          </Button>
        </div>
        <Nav>
          <NavLink to={"/SignupPage"} style={{ color: "white", paddingTop: "1rem" }}>
            Don't have an Account?
          </NavLink>
        </Nav>
      </Form>
    </section>
  );
};

export default LoginPage;
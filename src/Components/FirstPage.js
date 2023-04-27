import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./FirstPage.module.css";
import { useContext } from "react";
import AuthContext from "../Store/AuthContext";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/authSlice";
import { useSelector } from "react-redux";
import authSlice from "../Store/authSlice";
import { useHistory } from "react-router-dom";

const FirstPageDetails = () => {
  // const authCtx = useContext(AuthContext);
  const isPremium = useSelector((state) => state.expenses.showPremium);
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const logout = () => {
    // authCtx.logout();
    dispatch(authActions.logout());
  };


  return (
    <Navbar style={{marginTop : "450px"}}
      bg="white"
      expand="lg"
      variant="light"
      className="border border-white mt-2 "
    >
      <Navbar.Brand style={{ fontSize: "xx-large", marginLeft: "2rem"}}>
        ExpenseTracker App
      </Navbar.Brand>
      <Container className="justify-content-center ">
        <Nav>
          {!isAuthenticated && (
            <>
              <NavLink to="/LoginPage" className={classes.login}>
                Login
              </NavLink>

              <NavLink to="/SignupPage" className={classes.signup}>
                SignUp
              </NavLink>
            </>
          )}
          {isAuthenticated && (
            <NavLink
            to="/HomeDetails"
            className={classes.font}
            style={{ color: "green" }}
          >
            Home
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            to="/AddExpenseDetails"
            className={classes.font}
            style={{ color: "green" }}
          >
            AddExpenseDetails
          </NavLink>
        )}
        {isAuthenticated && (
            <NavLink
              to="/Home"
              className={classes.font}
              style={{ color: "Red" }}
              onClick={logout}
            >
              LOGOUT
            </NavLink>
          )}
          {isPremium && (
            <NavLink
              to="/premium"
              className={classes.font}
              style={{ color: "Red" }}
            >
              Activate Premium
            </NavLink>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;
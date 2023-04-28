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
import { expenseActions } from "../Store/expenseSlice";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";

const FirstPageDetails = () => {
  // const authCtx = useContext(AuthContext);
  const isPremium = useSelector((state) => state.expenses.showPremium);

  const receivedData = useSelector((state) => state.expenses.receivedData);
  console.log(receivedData);
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const downloadExpenses = () => {
    // Create a CSV string from the received data
    const csv =
      "Category,Description,Amount\n" +
      Object.values(receivedData)
        .map(
          ({ category, description, amount }) =>
            `${category},${description},${amount}`
        )
        .join("\n");

    // Create a new blob with the CSV data
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

    // Save the blob as a file with the name "expenses.csv"
    saveAs(blob, "expenses.csv");
  };

  const premiumClickHandler = () => {
    localStorage.setItem("twoButtons", true);
    window.location.reload();
  };
  const isPremiumClicked = (localStorage.getItem("twoButtons")==="true");

  const logout = () => {
    // authCtx.logout();
    dispatch(authActions.logout());
    localStorage.setItem("twoButtons", false);
    localStorage.removeItem("dark or not");
  };

  const changeToDark = () => {
    dispatch(expenseActions.toggleDark());
  };

  console.log(useSelector((state) => state.expenses.showDark));


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
          {isAuthenticated && isPremium && !isPremiumClicked && (
            <NavLink
              to="/AddExpenseDetails"
              className={classes.font}
              style={{ color: "Red" }}
              onClick={premiumClickHandler}
            >
              Activate Premium
            </NavLink>
          )}
           {isAuthenticated && isPremium && isPremiumClicked && (
            <NavLink
              className={classes.font}
              to="/AddExpenseDetails"
              onClick={changeToDark}
            >
              Toggle dark/light theme
            </NavLink>
          )}

          {isAuthenticated && isPremium && isPremiumClicked && (
            <Button variant="primary" onClick={downloadExpenses}>
              Download Expenses
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default FirstPageDetails;
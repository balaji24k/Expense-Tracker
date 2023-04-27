import './App.css';
import SignUpPage from './Components/SignUpPage';
import {BrowserRouter as Router, Route , Switch, Redirect } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import AfterLogin from './Components/AfterLogin';
import FirstPageDetails from "./Components/FirstPage";
import CompleteProfile from "./Components/CompleteProfile";
import VerificationPage from './Components/Verificationpage';
import AddExpenseDetails from './Components/AddExpenses';
import AuthContext from './Store/AuthContext';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isLoggedIn, "inAppJs");

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <FirstPageDetails/>
      <Switch>
        <Route exact path="/SignupPage">
          <SignUpPage />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage />
        </Route>
        <Route exact path="/WelcomePage">
          <AfterLogin />
        </Route>
        <Route  exact path="/completeProfile">
          <CompleteProfile/> 
        </Route>
        <Route exact path="/Home">
          <Redirect to={"/LoginPage"} />
        </Route>
        <Route exact path="/">
          {authCtx.isLoggedIn && <Redirect to={"/AddExpenseDetails"} />}
          {/* {!authCtx.isLoggedIn && <Redirect to={"/LoginPage"} />} */}
        </Route>
        <Route exact path="/verify-email">
          <VerificationPage/>
        </Route>
        <Route exact path="/AddExpenseDetails">
          <AddExpenseDetails/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

import './App.css';
import SignUpPage from './Components/SignUpPage';
import {BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import AfterLogin from './Components/AfterLogin';
 

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SignUpPage />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage />
        </Route>
        <Route exact path="/WelcomePage">
          <AfterLogin />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

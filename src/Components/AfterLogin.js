import classes from "./AfterLogin.module.css";
import { NavLink } from "react-router-dom";

const AfterLogin = () => {
  // const history = useHistory();
  
  return (
    <>
      <div className={classes.body}>
        <h1>Welcome To Expense Tracker!!!</h1>
        <h4>
          Your Profile incomplete.
          <NavLink to="/completeProfile">Complete Now</NavLink>
        </h4>
        <hr />
      </div>
      <div></div>
    </>
  );
};
export default AfterLogin;
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const AfterLogin = () => {
  const history = useHistory();
  const [login, setLogin] = useState(false);

  const SwitchMode = (prev) => {
    setLogin((prev) => !prev);
  };
  return (
    <>
      <div style={{ color: "white" }}>
        <h1>Welcome to the Expense Tracker!!!</h1>
      </div>
      
      <Button onClick={SwitchMode}> Login With Other Account
        {login ? history.replace("/LoginPage") : ""}
      </Button>
    </>
  );
};
export default AfterLogin;
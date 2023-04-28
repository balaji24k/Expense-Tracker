import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Table } from "react-bootstrap";
import classes from "./AddExpenses.module.css";
// import AuthContext from "../Store/AuthContext";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../Store/expenseSlice";

const AddExpenseDetails = () => {
  const dispatch = useDispatch();
  let totalAmount = 0;
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expenses, setExpenses] = useState([]);

  // const authCtx = useContext(AuthContext);
  const [passExpenses, setPassExpenses] = useState([]);
  const [isEdititng, setIsEditing] = useState(false);

  const LoggedInEmail = useSelector((state) => state.auth.userEmail);
  console.log(LoggedInEmail,"loggedInEmail")
  // console.log(`emailOfLoggedInUser ${LoggedInEmail}`);
  const UserEmail = LoggedInEmail.replace(/[@.]/g, "");
 
  const handleEditedUpdatation = () => {
    const key = localStorage.getItem("keyToEdit");

    const editedExpense = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };
    axios
      .post(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${UserEmail}.json`,
        editedExpense
      )
      .then((response) => {
        console.log(response.data);
        setExpenses([...expenses, editedExpense]);
        setIsEditing(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error updating todo:", error);
      });
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  // useEffect(() => {
    
  //   axios
  //     .get(
  //       `https://react-auth-96423-default-rtdb.firebaseio.com/${UserEmail}.json`
  //     )
  //     .then((response) => {
  //       if (response.data) {
  //         setPassExpenses(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //     console.log(expenses);
  // }, [expenses]);


  const handleSubmit = (event) => {
    event.preventDefault();

    const expenseList = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    axios
      .post(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${UserEmail}.json`,
        expenseList
      )
      .then((response) => {
        console.log(response);
        setExpenses([...expenses, expenseList]);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(UserEmail,"inside submitHandler");
    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  }

  const handleDelete = (key) => {
    axios
      .delete(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${UserEmail}/${key}.json`
      )
      .then((response) => {
        console.log("Expense successfully deleted");
        // Remove expense from passExpenses state
        const updatedExpenses = { ...passExpenses };
        delete updatedExpenses[key];
        setPassExpenses(updatedExpenses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEdit = (key) => {
    localStorage.setItem("keyToEdit", key);
    setIsEditing(true);
    axios
      .get(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${UserEmail}/${key}.json`
      )
      .then((response) => {
        
        amountRef.current.value = response.data.amount;
        descriptionRef.current.value = response.data.description;
        categoryRef.current.value = response.data.category;
        handleDelete(key);
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  useEffect(() => {
    axios
      .get(
        `https://react-auth-96423-default-rtdb.firebaseio.com/${UserEmail}.json`
      )
      .then((response) => {
        if (response.data) {
          setPassExpenses(response.data);
          console.log(response.data);
          dispatch(expenseActions.receivedData(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [expenses]);

  {
    Object.keys(passExpenses).forEach((key) => {
      totalAmount += +passExpenses[key].amount;
    });
  }

  if (totalAmount > 10000) {
    dispatch(expenseActions.Premium());
  } else {
    dispatch(expenseActions.notPremium());
  }
  

  return (
    
      <div className={classes.expense}>
        <h2 className="text-center">Daily Expense Tracker</h2>
        <Form onSubmit={handleSubmit} className="container">
          <Form.Group controlId="amount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              type="number"
              placeholder="amount"
              ref={amountRef}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              ref={descriptionRef}
              required
            />
          </Form.Group>
          <Form.Group controlId="category">
            <Form.Label>Category:</Form.Label>
            <Form.Select as="select" ref={categoryRef} required>
              <option value="">--Choose Category--</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
          {!isEdititng && (
              <Button variant="primary" type="submit" className="mt-3">
                Add Expense
              </Button>
            )}
            {isEdititng && (
              <Button
                variant="info"
                className="mt-3"
                onClick={handleEditedUpdatation}
              >
                Update Expense
              </Button>
            )}
          </div>{" "}
        </Form>{" "}
      
      <h3 className="text-center mt-1 text-white">Expenses</h3>
      <Table striped bordered hover variant="light" className="container">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Modifications</th>
          </tr>
        </thead>
        <tbody>
             {Object.keys(passExpenses).map((key, index) => (
              <tr key={key}>
                <td>{index + 1}</td>
                <td>{passExpenses[key].amount}</td>
                <td>{passExpenses[key].description}</td>
                <td>{passExpenses[key].category}</td>
  
                <td>
                  <Button className="m-3" onClick={() => handleEdit(key)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(key)}>
                    Delete
                  </Button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>{""}
      <h1 className="text-white">Total amount: {totalAmount}.00</h1>
    </div>
  );
};

export default AddExpenseDetails;
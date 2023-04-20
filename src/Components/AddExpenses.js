import React, { useRef, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import classes from "./AddExpenses.module.css";

const AddExpenseDetails = () => {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const expenseList = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    setExpenses([...expenses, expenseList]);

    console.log(expenseList);

    amountRef.current.value = "";
    descriptionRef.current.value = "";
    categoryRef.current.value = "";
  };

  return (
    <div>
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
              <option value="Food">--Choose Category--</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit" className="mt-3">
              Add Expense
            </Button>
          </div>{" "}
        </Form>{" "}
      </div>
      <h3 className="text-center mt-5 text-white">Expenses</h3>
      <Table striped bordered hover variant="light" className="container">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AddExpenseDetails;
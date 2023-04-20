import React, { useRef } from "react";
import { Form, Button } from "react-bootstrap";

const CompleteProfile = () => {
  const name = useRef();
  const photoUrl = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    // Call Firebase API to update user details
    const enteredName = name.current.value;
    const enteredPhotoUrl = photoUrl.current.value;

    console.log(enteredName);
    console.log(enteredPhotoUrl);

    if (enteredName === "" || enteredPhotoUrl === "") {
      alert("please enter both full name and URL");
      return;
    } else {
      
        fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBO-uWvkbDxYCjipLzXz0ZulQvNenR57ww",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: localStorage.getItem("token"),
              displayName: enteredName,
              photoUrl: enteredPhotoUrl,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => {
            if (res.ok) {
              console.log("Sent succesful");
              alert("Update succesful");
              console.log(res);
              return res.json();
            } else {
              return res.json().then((data) => {
                console.log(data);
                let errorMessage = "Updation failed filed!";
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
      }
    }
  

  return (
    <Form onSubmit={submitHandler} className="container mt-5">
      <h2 className="text-center text-white">Update profile</h2>
      <Form.Group controlId="formFullName">
        <Form.Label style={{ color: "white" }}>Full Name</Form.Label>
        <Form.Control type="text" ref={name} />
      </Form.Group>
      <Form.Group controlId="formPhotoUrl">
        <Form.Label style={{ color: "white" }}>Profile Photo URL</Form.Label>
        <Form.Control type="text" ref={photoUrl} />
      </Form.Group>
      <div className="text-center">
        <Button variant="success" type="submit" className="mt-2">
          Update
        </Button>
      </div>
    </Form>
  );
};

export default CompleteProfile;
import React, { useRef, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const CompleteProfile = () => {
  const name = useRef();
  const photoUrl = useRef();

  useEffect(() => {
    // console.log(localStorage.getItem("token"),"after refreshed");
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBO-uWvkbDxYCjipLzXz0ZulQvNenR57ww",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token2"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("Received the users details from the Firebase server");
          console.log(res);
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data,"data im else");
            let errorMessage = "Updation failed filed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(errorMessage,"error");
          });
        }
      })
      .then((data) => {
        console.log(data)
        // console.log(data.users[0].displayName,"afterRefreshed");
        // console.log(data.users[0].photoUrl);
        name.current.value = data.users[0].displayName; //if we use useState then we write "setState"for functionality & for useRef we use this line for functionality.
        photoUrl.current.value = data.users[0].photoUrl;
        // console.log(data.displayName);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);


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
            console.log("posted");
            if (res.ok) {
              console.log("Sent succesful");
              alert("Update succesful");
              console.log(res);
              return res.json();
            } else {
              return res.json().then((data) => {
                console.log(data,"insideCompleteProfile");
                let errorMessage = "Updation failed failed!";
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
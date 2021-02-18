import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import DatePicker from "react-datepicker";
import { Form, Button, Alert } from "react-bootstrap";
import { backendPath } from "../auth";

import "../css/text.css";


export function SignupForm(props) {
  // Callback to switch the signup form to login form
  const { switchSignup } = props;

  // Set error on true if registration procedure fails
  const [ error, setError ] = useState(false);

  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password1, setPassword1 ] = useState("");
  const [ password2, setPassword2 ] = useState("");
  // Extra employee details
  const [ bornDate, setBornDate ] = useState(new Date());
  const [ company, setCompany ] = useState("");
  const [ job, setJob ] = useState("");

  // Minimum username length
  const MIN_USERNAME_LEN = 4;
  // Minimum password length
  const MIN_PASSWD_LEN = 8;

  const submitRegistration = (e) => {
    e.preventDefault();
    setError(false);

    const loginUrl = backendPath("/api/accounts/register/");
    let data = {
      username: username,
      email: email,
      password: password1,
      password_confirm: password2,
      // birthday: bornDate.toLocaleDateString(),
      // company: company,
      // job: job
    };

    // Send login request in order to retrieve user token
    axios.post(loginUrl, data).then(res => {
      if (res.status === 201) {
        swal("Sign up succesfully! Now you can log in!", {
          icon: "success",
          closeOnClickOutside: false
        }).then(() => {
          window.location = "/login/";
        })
      } else {
        setError(true);
      }
    }).catch(e => {
      setError(true);
    });

    // Reset fields
    setUsername("");
    setEmail("");
    setPassword1("");
    setPassword2("");
  }

  const checkForm = () => {
    return email === "" || username.length < MIN_USERNAME_LEN ||
      password1.length < MIN_PASSWD_LEN || password1 !== password2;
  }

  return (
    <div>
      <div style={ { width: "100%", height: 100 } } ></div>
      <Form
        className="container center_div polaris"
        style={ { color: "white", maxWidth: 500 } }
        onSubmit={ submitRegistration }
      >
        <Form.Group>
            { error && <Alert
                className="text-danger"
              >Invalid fields detected! Please, re-try registration...</Alert>
            }
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Your username"
              className="polaris-xsm"
              size="sm"
              value={ username }
              onChange={(e) => setUsername(e.target.value) }
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email"
              className="polaris-xsm"
              size="sm"
              value={ email }
              onChange={(e) => setEmail(e.target.value) }
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              className="polaris-xsm"
              size="sm"
              value={ password1 }
              onChange={ (e) => setPassword1(e.target.value) }
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-type password"
              className="polaris-xsm"
              size="sm"
              value={ password2 }
              onChange={ (e) => setPassword2(e.target.value) }
            />
        </Form.Group>
        { /* Employee extra details */}
        <Form.Group>
          <Form.Label>Birthday</Form.Label>
          <DatePicker selected={ bornDate } onChange={date => setBornDate(date)} />
        </Form.Group>
        <Form.Group>
            <Form.Label>Company name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company"
              className="polaris-xsm"
              size="sm"
              value={ company }
              onChange={ (e) => setCompany(e.target.value) }
            />
        </Form.Group>
        <Form.Group>
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              placeholder="Job"
              className="polaris-xsm"
              size="sm"
              value={ job }
              onChange={ (e) => setJob(e.target.value) }
            />
        </Form.Group><br />

        <Form.Text className="text-muted" >
          You already have an account? <b onClick={ switchSignup } >Log in!</b>
        </Form.Text>

        <br />
        <Button
          variant={ checkForm() ? "outline-info" : "info" }
          type="submit"
          style={ { width: 150, float: "right" } }
          disabled={ checkForm() }
        >Sign up!</Button>
      </Form>
    </div>
  );
}

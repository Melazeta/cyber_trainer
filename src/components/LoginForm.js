import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import { logIn, isLoggedIn, backendPath } from "../auth";


export function LoginForm(props) {
  // Callback to switch the login form to signup form
  const { switchSignup } = props;

  // Set error on true if login procedure fails
  const [ error, setError ] = useState(false);

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ stayConnected, setStayConnected ] = useState(false);

  // Minimum username length
  const MIN_USERNAME_LEN = 4;
  // Minimum password length
  // TODO Change it in 8 in production
  const MIN_PASSWD_LEN = 6;

  const submitLogin = (e) => {
    e.preventDefault();
    setError(false);

    const loginUrl = backendPath("/api/token/");

    // Send login request in order to retrieve user token
    axios.post(loginUrl, { username: username, password: password }).then(res => {
      if (res.status === 200) {
        logIn(res.data, stayConnected);
      } else {
        setError(true);
      }
    }).catch(e => {
      setError(true);
    });

    // Reset fields
    setUsername("");
    setPassword("");
  }

  // Redirect to index page if logged in
  if (isLoggedIn()) {    
    return <Redirect to="/" />
  }

  return (
    <div>
      <div style={ { width: "100%", height: 100 } } ></div>
      <Form
        className="container center_div"
        style={ { color: "white", maxWidth: 500 } }
        onSubmit={ submitLogin }
      >
        <Form.Group>
            { error && <Alert className="text-danger" style={ { marginLeft: -20, marginRight: -20 } }>
              Invalid <b>username</b> or <b>password</b>! Please try again...</Alert> }
            <Form.Label>Username</Form.Label>
            <Form.Control            
              type="username"
              placeholder="Your username"
              size="sm"
              value={ username }
              onChange={(e) => setUsername(e.target.value) }
            />
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              size="sm"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
        </Form.Group><br />

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Stay connected"
            size="sm"
            value={ stayConnected }
            onChange={ e => setStayConnected(e.target.checked) }
          />
        </Form.Group>
        <Form.Text className="text-muted" >
          You don't have an account? <b onClick={ switchSignup } >Sign up!</b>
        </Form.Text>

        <br />
        <Button
          variant={ (username.length < MIN_USERNAME_LEN || password.length < MIN_PASSWD_LEN) ? "outline-info" : "info" }
          type="submit"
          style={ { width: 150, float: "right" } }
          disabled={ username.length < MIN_USERNAME_LEN || password.length < MIN_PASSWD_LEN }
        >Log in!</Button>
      </Form>
    </div>
  );
}

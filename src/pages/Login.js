import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NewsCarousel } from "../components/NewsCarousel";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

import "../css/particle.css";
import "../css/text.css";


function Login(props) {
  // Display the login form or the signup form
  const [ useLogin, setUseLogin ] = useState(true);

  useEffect(() => {
    document.title = "Cyber Trainer - Login";
    // Add animated background effect
    const script = document.createElement("script");
    script.src = "/js/particle.min.js";
    script.async = false;

    document.body.appendChild(script);
  }, []);

  return (
    <div id="particle-canvas" className="polaris-sm">
      <div id="foreground">
        <Navbar variant="dark" bg="dark">
          <Nav style={ { width: "100%" } } >
            <h3 style={ { width: "100%", textAlign: "center", color: "white" } } >
              Welcome to a new <b>cyber training platform</b>
            </h3>
          </Nav>
        </Navbar>
        { useLogin ? 
          (
            <div>
              <LoginForm switchSignup={ () => setUseLogin(false) } />
              <div style={ { width: "100%", height: "30%", bottom: 0, position: "fixed" } }>
                <NewsCarousel />
              </div>
            </div>
          ) : <SignupForm switchSignup={ () => setUseLogin(true) } />
        }
      </div>
    </div>
  );
}

export default Login;
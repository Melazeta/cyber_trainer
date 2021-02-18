import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { caseData } from "../auth";
import swal from "sweetalert";
import { playAudio } from "../utils";
import { CardGroup, Card } from "react-bootstrap";

import "../css/overview.css";
import "../css/text.css";


// Panel contains buttons to access to each cyber category (emails, web history, conversations, ...)
export function ControlPanel(props) {
  const startTime = props.startTime;
  // Steps already read
  const read = props.read;
  const employer_id = props.employer_id;
  const employer = caseData().characters[employer_id];
  const labels = props.labels;
  // Navigate in another category when a control button is pressed
  const [ navigation, setNavigation ] = useState(false);

  if (!employer) {
    return ( 
      <div>
        <h4>No employer selected!</h4>
      </div>
    );
  }

  const openSection = (employer, sectionName) => {
    playAudio("selection-track");
    swal("Accessing " + employer.first_name + " " + employer.last_name + " " + sectionName + "...", {
      timer: 1300,
      icon: "/spinner.gif",
      closeOnClickOutside: false,
      className: "ai-message",
      buttons: false
    }).then(() => setNavigation(sectionName));
    document.getElementsByClassName("swal-text").item(0).style.color = "white";
    document.getElementsByClassName("swal-text").item(0).style["text-align"] = "center";
    document.getElementsByClassName("swal-text").item(0).style["font-family"] = "Polaris";
  }

  // Count unread notifies (emails, conversations, ...)
  const countUnread = (data, step_category) => {
    let counter = 0;

    for (let i = 0; i < data.length; i++) {
      if (data[i].role_id !== 1 && (read[step_category + "s"].indexOf(data[i][step_category + "_id"]) === -1))
        counter++;
    }

    return counter;
  }

  const navigate = section => {
    const s = { employer_id: employer_id, labels: labels, read: read, startTime: startTime };

    switch (section) {
      case "emails": return <Redirect to={ { pathname: "/emails/", state: s } } />;
      case "web history": return <Redirect to={ { pathname: "/web-history/", state: s } } />;
      case "chats": return <Redirect to={ { pathname: "/chats/", state: s } } />;
      case "calls": return <Redirect to={ { pathname: "/calls/", state: s } } />;
    }
  }

  // Navigate on the category page selected by the user
  if (navigation) {
    return navigate(navigation);
  }

  return (
    <div style={ { height: "100%" } }>
      <h4 className="polaris text-light unselectable" >Cyber Intelligence tools</h4><br />
      <CardGroup className="polaris-sm text-light" >
        { /* Emails card */}
        <Card
          border="info"
          className="text-center tool-card unselectable"
          onClick={ () => openSection(employer, "emails") }
          style={ { backgroundColor: "#303030", margin: 10 } }
        >
          <Card.Img
            src="/icons/email.png"
            style={ { width: 160, height: 160 } }
            className="tool-image"
          />
          <Card.Body>
            <Card.Title>Emails</Card.Title>
            <Card.Text>
              Access to { employer.first_name } { employer.last_name } emails registry.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">New emails: { countUnread(employer.emails, "email") }</small>
          </Card.Footer>
        </Card>
        { /* Web history card */}
        <Card
          border="info"
          className="text-center tool-card unselectable"
          onClick={ () => openSection(employer, "web history") }
          style={ { backgroundColor: "#303030", margin: 10 } }
        >
          <Card.Img
            src="/icons/history.png"
            style={ { width: 160, height: 160 } }
            className="tool-image"
        />
          <Card.Body>
            <Card.Title>Web history</Card.Title>
            <Card.Text>
              View web history and downloaded file by { employer.first_name } { employer.last_name }.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">New web sites visited: { countUnread(employer.sites, "site") }</small>
          </Card.Footer>
        </Card>
      </CardGroup>

      <CardGroup className="polaris-sm text-light" >
        { /* Chats card */}
        <Card
          border="info"
          className="text-center tool-card unselectable"
          onClick={ () => openSection(employer, "chats") }
          style={ { backgroundColor: "#303030", margin: 10 } }
        >
          <Card.Img
            src="/icons/chat.webp"
            style={ { width: 160, height: 160 } }
            className="tool-image"
          />
          <Card.Body>
            <Card.Title>Chats</Card.Title>
            <Card.Text>
              View { employer.first_name } { employer.last_name } chat conversations.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Unread messages: { countUnread(employer.chats, "chat") }</small>
          </Card.Footer>
        </Card>
        { /* Calls card */}
        <Card
          border="info"
          className="text-center tool-card unselectable"
          onClick={ () => openSection(employer, "calls") }
          style={ { backgroundColor: "#303030", margin: 10 } }
        >
          <Card.Img
            src="/icons/telephone.png"
            style={ { width: 160, height: 160 } }
            className="tool-image"
          />
          <Card.Body>
            <Card.Title>Calls registry</Card.Title>
            <Card.Text>
              View web history and downloaded file by { employer.first_name } { employer.last_name }.
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Incoming conversations: { countUnread(employer.calls, "call") }</small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <audio className="locked-track" >
        <source src="/audio/locked.mp3" ></source>
      </audio>
      <audio className="selection-track" >
        <source src="/audio/selection.mp3" ></source>
      </audio>
    </div>
  );
}
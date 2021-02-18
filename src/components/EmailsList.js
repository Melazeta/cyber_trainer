import React, { useState } from "react";
import { openProgress } from "../utils";
import { Table } from "react-bootstrap";

import "../css/text.css";


export function EmailsList(props) {
  const read = props.read;
  const emails = props.emails;
  // Callback to set email to open (clicked)
  const openEmail = props.openEmail;

  const [ hover, setHover ] = useState(false);

  return (
    <div>
      <h4 className="polaris text-light unselectable" >Incoming emails</h4><br />
      <Table className="polaris-sm text-light unselectable" style={ { backgroundColor: "rgba(48, 48, 48, 0.4)" } }>
        <tbody>
          <tr>
            <td><b>From</b></td>
            <td><b>Object</b></td>
            <td><b>Received on</b></td>
            <td></td>
          </tr>
        {
          emails.map((email, index) => (
            <tr
              key={ index }
              onMouseLeave={ () => setHover(false) }
              onMouseEnter={ () => setHover(index) }
              onClick={ () => openProgress(() =>  openEmail(email.email_id)) }
              style={ { maxHeight: 30, backgroundColor: index === hover ? "#20639B" : "transparent" } }
            >
            { (read.emails.indexOf(email.email_id) === -1) ? (
              <React.Fragment>
                <td><b>{ email.from_name }</b></td>
                <td><b>{ email.object }</b></td>
                <td><b>{ email.datetime }</b></td>
                <td><b>•</b></td>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <td>{ email.from_name }</td>
                <td>{ email.object }</td>
                <td>{ email.datetime }</td>
                <td></td>
              </React.Fragment>
            )}
            </tr>
        )) }
        </tbody>
      </Table>
      { emails.length === 0 && <h4
          className="polaris text-light"
          style={ { color: "white", textAlign: "center", marginTop: "10%" } }
        >No emails to display</h4>
      }
      <audio className="softClick-track" >
        <source src="/audio/soft_click.mp3" ></source>
      </audio>
    </div>
  );
}
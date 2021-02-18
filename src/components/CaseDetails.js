import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { backendPath, setCaseData } from "../auth";
import { playAudio } from "../utils";
import swal from "sweetalert";
import { Table, Image, Button } from "react-bootstrap";

import "../css/text.css";


// Display the cases list
export function CaseDetails(props) {
  const { selectedCase } = props;
  const [ startCase, setStartCase ] = useState(false);

  const Box = ({ color }) => {
    return (
      <div style={ {
        height: 25,
        width: 25,
        marginRight: 15,
        marginBottom: 15,
        border: "1px solid black",
        backgroundColor: color
      } }></div>
    )
  }

  const difficulty2color = difficulty => {
    switch (difficulty) {
      case "easy": return "green";
      case "medium": return "orange";
      case "hard": return "red";
      default: return "white";
    }
  }

  const capitalize = s => {
    if (typeof s !== "string")
      return "";
    
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  if (selectedCase === null)
    return (
      <div
        style={ { backgroundColor: "transparent", textAlign: "center", color: "white" } }
      >
        <h3 className="unselectable" >Select a case ...</h3>
      </div>
    )

  const starting = () => {
    playAudio("selection-track");
    swal({
      title: selectedCase.title,
      text: "\nThis case takes about " + selectedCase.average_duration + " minuts...\n\nDo you want start?",
      icon: "info",
      closeOnClickOutside: false,
      className: "polaris-sm",
      buttons: true
    })
    .then(start => {
      if (start) {
        playAudio("level_loading-track");
        setCaseData(selectedCase)
        swal("\nPreparing your case...", {
          timer: 3000,
          icon: "spinner2.gif",
          closeOnClickOutside: false,
          className: "polaris-sm",
          buttons: false
        }).then(() => setStartCase(true));
      }
      else {
        playAudio("locked-track");
        // Reset case data before start the case
        setCaseData();
      }
    })
  }

  const disabledMessage = () => {
    playAudio("locked-track");
    swal({
      title: "Case locked!",
      text: "\nYou don't have already unlocked this case!\n\nSolve the previous before...",
      icon: "warning",
      className: "polaris-sm",
      closeOnClickOutside: false
    }).then(() => playAudio("selection-track"));
  }

  // Redirect to the case overview (run the level)
  if (startCase)
    return <Redirect to={ { pathname: "/overview/", state: {
      firstOpening: true,
      read: {
        emails: [],
        calls: [],
        chats: [],
        sites: []
      }
    }} } />

  return (
    <div className="text-light unselectable" style={ { backgroundColor: "transparent", opacity: selectedCase.locked ? 0.6 : 1 } } >
      <h3>{ selectedCase.title }</h3>
      <hr style={ { backgroundColor: "#DDDDDD" } } />
      <div style={ { display: "block", alignText: "left", height: 300 } } >
      <Table striped variant="dark">
        <tbody>
        <tr>
          <td><p className="ace" style={ { whiteSpace: "pre-line" } } >{ selectedCase.description }</p></td>
          <td>
            <Image
              src={ backendPath(selectedCase.preview) }
              style={ { float: "right", marginRight: 10, width: 460, height: 280 } }
              thumbnail
            />
          </td>
          </tr>
          </tbody>
        </Table>
      </div>
      <h4 style={ { marginTop: 20 } } >Difficulty</h4>
      <hr style={ { backgroundColor: "#DDDDDD" } } />
      <div style={ { display: "inline-flex" } } >
        <Box color={ difficulty2color(selectedCase.difficulty) } />
        <p>{ capitalize(selectedCase.difficulty) }</p>
      </div>
      <hr style={ { backgroundColor: "#DDDDDD" } } />
      { selectedCase.locked ? (
        <Button
          variant="outline-info"
          style={ { width: 200, float: "right" } }
          onClick={ disabledMessage }
        ><b>Locked!</b></Button>
      ) : (
        <Button
          variant="info"
          style={ { width: 200, float: "right" } }
          onClick={ starting }
        ><b>Start!</b></Button>
      )}
      <audio className="level_loading-track" >
        <source src="/audio/level_loading3.mp3" ></source>
      </audio>
      <audio className="selection-track" >
        <source src="/audio/selection.mp3" ></source>
      </audio>
    </div>
  );
}

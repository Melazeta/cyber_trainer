import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import { playAudio } from "../utils";
import { Button } from "react-bootstrap";

import "../css/text.css";


export function CaseSolver(props) {
  const employer_id = props.employer_id;
  const read = props.read;
  const startTime = props.startTime;
  const labels = props.labels;
  const [ finalReport, setFinalReport ] = useState(false);

  const solveCase = () => {
    playAudio("click-track");
    swal("\nYou're about to wrap up the case...\n\nAre you sure to proceed?", {
        icon: "info",
        title: "Solve this case",
        className: "ai-message",
        closeOnClickOutside: false,
        buttons: {
          cancel: {
            text: "Cancel",
            value: false,
            visible: true,
            className: "polaris",
            closeModal: true,
          },
          confirm: {
            text: "OK",
            value: true,
            visible: true,
            className: "polaris",
            closeModal: true
          }
        },
      }).then(solve => {
        if (solve) {
          //playAudio("selection-track");
          setFinalReport(true);
        } else {
          playAudio("locked-track");
        }
      });
    document.getElementsByClassName("swal-title").item(0).style["font-family"] = "Polaris";
    document.getElementsByClassName("swal-title").item(0).style.color = "white";
    document.getElementsByClassName("swal-text").item(0).style.color = "white";
    document.getElementsByClassName("swal-text").item(0).style["text-align"] = "center";
    document.getElementsByClassName("swal-text").item(0).style["font-family"] = "Polaris";
  }

  // Redirect to final report page
  if (finalReport)
    return <Redirect to={ {
      pathname: "/final-report/",
      state: {
        employer_id: employer_id,
        read: read,
        labels: labels,
        startTime: startTime
      }
    } } />;

  return (
    <div>
      <Button
        variant="outline-info"
        className="polaris"
        style={ { marginRight: 10, width: 200 } }
        onClick={ solveCase }
      >Solve case</Button>
      <audio className="click-track" >
        <source src="/audio/click.mp3" ></source>
      </audio>
      <audio className="selection-track" >
        <source src="/audio/selection.mp3" ></source>
      </audio>
      <audio className="locked-track" >
        <source src="/audio/locked.mp3" ></source>
      </audio>
    </div>
  )
}
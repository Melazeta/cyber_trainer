import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import { caseData } from "../auth";
import { playAudio, millis2MinSec } from "../utils";
import { Navbar, Button, Image } from "react-bootstrap";
import { CaseSolver } from "./CaseSolver";

import "../css/overview.css";


export function Playbar(props) {
  // Datetime since the case started
  const employer_id = props.employer_id;
  const read = props.read;
  const startTime = props.startTime;
  const labels = props.labels;
  const backLocation = props.backLocation;
  const backState = props.backState;
  const [ back, setBack ] = useState(false);
  const [ elapsedTime, setElapsedTime ] = useState(
    Math.floor((new Date().getTime() - startTime) / 1000 % 60)
  )

  const menu = () => {
    playAudio("click-track");
    swal({
      title: "Leave this case",
      text: "\nIf you leave this case all progress will be lost\n\nDo you want exit?",
      icon: "warning",
      className: "ai-message",
      closeOnClickOutside: false,
      buttons: true
    })
    .then(back2menu => {
      if (back2menu) {
        playAudio("selection-track");
        // Wait 0.3 seconds before redirect to manu page
        setTimeout(() => {
          window.location = "/";
        }, 500);
      }
      else {
        playAudio("locked-track");
      }
    });
    document.getElementsByClassName("swal-title").item(0).style["font-family"] = "Polaris";
    document.getElementsByClassName("swal-title").item(0).style.color = "white";
    document.getElementsByClassName("swal-text").item(0).style.color = "white";
    document.getElementsByClassName("swal-text").item(0).style["text-align"] = "center";
    document.getElementsByClassName("swal-text").item(0).style["font-family"] = "Polaris";
  }

  const backProgress = () => {
    playAudio("locked-track");
    swal("", {
      timer: 600,
      icon: "/spinner2.gif",
      closeOnClickOutside: false,
      className: "back-progress",
      buttons: false
    }).then(() => setBack(true));
  }

  useEffect(() => {
    // Count elapsed time
    let timer = setInterval(() => setElapsedTime(new Date().getTime() - startTime))

    return () => {
      clearInterval(timer);
    }
  }, [])

  // Redirect to previous page if back button has been pressed
  if (back)
    return <Redirect to={ { pathname: backLocation, state: backState } } />;

  return (
    <div>      
      <Navbar style={ { backgroundImage: "-webkit-radial-gradient(top, #000005, #454545)" } } >
        { backLocation ? (
          <Button onClick={ backProgress } style={ {
              backgroundColor: "transparent",
              borderColor: "transparent",
              float: "left"
            } }
          >
            <Image style={ { width: 50, height: 50 } } src="/icons/back.png" />
          </Button>
        ) : (
          <Button onClick={ menu } style={ {
              backgroundColor: "transparent",
              borderColor: "transparent",
              float: "right"
            } }
          >
            <Image style={ { width: 50, height: 50 } } src="/icons/menu.png" />
          </Button>
        )}
        <div style={ {
          backgroundImage: "-webkit-radial-gradient(top, #00ffff, #000005)",
          height: 3,
          width: "99%",
          marginTop: -80,
          textAlign: "center"
        } } >
          <h5 className="polaris text-light" style={ { marginTop: 25 } } >
            Elapsed time { millis2MinSec(elapsedTime) }
          </h5>
        </div>
        <CaseSolver employer_id={ employer_id } read={ read } labels={ labels } startTime={ startTime } />
      </Navbar>
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
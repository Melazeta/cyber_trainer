import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Navbar, Nav, Table, Button, Image } from "react-bootstrap";
import { logOut, backendPath, requestConfig } from "../auth";
import { playAudio } from "../utils";
import { CasesList } from "../components/CasesList";
import { CaseDetails } from "../components/CaseDetails";

import "../css/cases.css";
import "../css/text.css";


// Main page after login with the cases list
function Cases(props) {
  const [ userStats, setUserStats ] = useState({});
  // List of cases ordered by level progress number
  const [ cases, setCases ] = useState([]);
  const [ selectedCase, setSelectedCase ] = useState(null);
  // If 'true' display a connection error over the page
  const [ error, setError ] = useState(false);

  // Retrive user statistics from backend
  const getProfile = () => {
    const profileUrl = backendPath("/api/accounts/profile/");
    setError(false);

    axios.get(profileUrl, requestConfig()).then(res => {
      if (res.status === 200) {
        setUserStats(res.data);
      }
      else {
        setError(true);
      }
    }).catch(e => {
      setError(true);
    });
  }

  // Retrive cases list from backend
  const getCases = () => {
    const casesUrl = backendPath("/api/cases/");
    setError(false);

    axios.get(casesUrl, requestConfig()).then(res => {
      if (res.status === 200) {
        setCases(res.data);
      }
      else {
        setError(true);
      }
    }).catch(e => {
      setError(true);
    })
  }

  // Retrive a case by case id
  const getCase = case_id => {
    if (case_id === null)
      return null;

    if (cases.next_case && cases.next_case.case_id === case_id)
      return cases.next_case;

    if (cases.locked_case && cases.locked_case.case_id === case_id) {
      cases.locked_case.locked = true;
      return cases.locked_case;
    }

    // Search the case in solved cases
    for (let i = 0; i < cases.solved_cases.length; i++) {
      if (cases[i].solved_cases.case_id === case_id)
        return cases.solved_cases[i];
    }

    return null;
  }

  const confirmLogout = () => {
    playAudio("selection-track");
    swal({
      title: "Log out",
      text: "\nDo you want leave this session?",
      icon: "warning",
      className: "polaris-sm",
      closeOnClickOutside: false,
      buttons: true
    })
    .then(exit => {
      playAudio("selection-track");
      if (exit) {
        // Wait 0.25 seconds before redirect to manu page
        setTimeout(() => {
          logOut();
        }, 500);
      }
      else {
        playAudio("locked-track");
      }
    });
  }

  useEffect(() => {
    getProfile();
    getCases();
    document.title = "Cyber trainer - Cases";
  }, [])

  if (cases.length === 0)
    return <div></div>;

  return (
    <div style={ {
      backgroundColor: "#353535",
      backgroundImage: 'url("skyline-bg.jpg")',
      backgroundRepeat: "no-repeat",
      backgroundSize: "115% 115%",
      backgroundPosition: "center center",
      animation: "shrink 15s infinite alternate",
      width: "100%",
      height: 1080
    } } className="polaris-sm text-light" onLoad={ ()=> playAudio("background-track") } >
      <Navbar variant="dark" bg="dark">
        <Nav style={ { width: "100%" } } >
          <h3 className="unselectable" style={ { width: "100%", textAlign: "left", color: "white" } } >
            Hi <b>{ userStats.username }</b>!
          </h3>
          <Button
            style={ { backgroundColor: "transparent", borderColor: "transparent", float: "right" } }
            onClick={ confirmLogout }
          >
            <Image style={ { width: 50, height: 50 } } src="/icons/logout.png" />
          </Button>
        </Nav>
      </Navbar><br />
      <Table striped bordered variant="dark" >
        <tbody>
          <tr>
            <td><CasesList cases={ cases } selectCase={ case_id => setSelectedCase(case_id) } /></td>
            <td style={ { width: "99%" } }><CaseDetails selectedCase={ getCase(selectedCase) } /></td>
          </tr>
        </tbody>
      </Table>
      <audio className="locked-track" >
        <source src="/audio/locked.mp3" ></source>
      </audio>
      <audio className="selection-track" >
        <source src="/audio/selection.mp3" ></source>
      </audio>
      <audio className="background-track" >
        <source src="/audio/mechanized_ambience.mp3" ></source>
      </audio>
    </div>
  );
}

export default Cases;
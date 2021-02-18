import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";
import { playAudio } from "../utils";
import { backendPath, caseData } from "../auth";
import { Navbar, Table, Image, Button } from "react-bootstrap";

import "../css/text.css";


export function EmployerDetails(props) {
  const read = props.read;
  const labels = props.labels;
  const startTime = props.startTime;
  const employer_id = props.employer_id
  const disableSocialButton = props.disableSocialButton;
  const employer = caseData().characters[employer_id];
  const [ navigateProfile, setNavigateProfile ] = useState(false);

  // Compute the age from the birthday date
  const ageFromBirthday = birthday => {
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const openProfile = (employer) => {
    playAudio("selection-track");
    swal("Retriving " + employer.first_name + " " + employer.last_name + " social data...", {
      timer: 1300,
      icon: "/spinner.gif",
      closeOnClickOutside: false,
      className: "ai-message",
      buttons: false
    }).then(() => {
      setNavigateProfile(true);
    });
    document.getElementsByClassName("swal-text").item(0).style.color = "white";
    document.getElementsByClassName("swal-text").item(0).style["text-align"] = "center";
    document.getElementsByClassName("swal-text").item(0).style["font-family"] = "Polaris";
  }

  if (navigateProfile)
    return <Redirect to={ { pathname: "/profile/", state: {
        employer_id: employer_id,
        read: read,
        labels: labels,
        startTime: startTime
      } } }
    />;

  if (!employer)
    return (
    <div>
      <h3
        className="text-light"
        style={ { textAlign: "center" } }
      >Select an employer...</h3>
    </div>);

  return (
    <div>
      <Navbar>
        <h4 className="polaris text-light unselectable" style={ { float: "right", width: 350 } } >Employer details</h4>
        { !disableSocialButton && ( 
          <React.Fragment>
            <Button
              variant="outline-info"
              style={ { float: "right", width: 65, height: 50, border: 0, marginLeft: "50%" } }
              onClick={ () => openProfile(employer) }
            >
              <Image style={ { width: "100%", height: "100%" } } src="/icons/profile.png" ></Image>
            </Button>
          </React.Fragment>
        )}
      </Navbar>
      <Table hover variant="dark" className="polaris-sm text-light unselectable" >
        <tbody>
            { /* Column for employer details table */}
            <tr>
              <td>
                <Table className="text-light" size="sm" >
                  <tbody>
                    <tr>
                      <td style={ {width: "35%" } } ><p><b>First name</b></p></td>
                      <td style={ {width: "65%" } } ><p>{ employer.first_name }</p></td>
                    </tr>
                    <tr>
                      <td><p><b>Last name</b></p></td>
                      <td><p>{ employer.last_name }</p></td>
                    </tr>
                    <tr>
                     <td><p><b>Age</b></p></td>
                      <td><p>{ ageFromBirthday(new Date(employer.born)) }</p></td>
                    </tr>
                    <tr>
                      <td><p><b>Job</b></p></td>
                      <td><p>{ employer.job }</p></td>
                    </tr>
                  </tbody>
                </Table>
              </td>
              { /* Column for employer image profile */ }
              <td style={ { width: 200 } } >
                <Image
                  src={ backendPath("/media/" + employer.avatar) }
                  style={ { width: 200, height: 200 } }
                  thumbnail />
                </td>
            </tr>
        </tbody>
      </Table>
      <audio className="selection-track" >
        <source src="/audio/selection.mp3" ></source>
      </audio>
    </div>
  );
}
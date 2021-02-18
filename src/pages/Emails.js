import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { playAudio, getEmployerSteps } from "../utils";
import { Playbar } from "../components/Playbar";
import { EmployerDetails } from "../components/EmployerDetails";
import { EmailsList } from "../components/EmailsList";
import { StepsContainer } from "../components/StepsContainer";
import { Redirect } from "react-router-dom";


// Show the emails list of the character
function Emails(props) {
  const startTime = props.location.state.startTime;
  // Steps read
  const read = props.location.state.read;
  const employer_id = props.location.state.employer_id;
  const labels = props.location.state.labels;
  // Selected email (to open)
  const [ openEmail, setOpenEmail ] = useState(false);

  useEffect(() => {
    document.title = "Cyber Trainer - Emails";
    playAudio("scanning-track");
  }, []);

  // If user click on an email, then redirect it to email viewer page
  if (openEmail)
    return <Redirect to={ {
      pathname: "/email-viewer/",
      state: {
        employer_id: employer_id,
        labels: labels,
        email_id: openEmail,
        read: read,
        startTime: startTime
      }
    } } />;

  return (
    <div style={ { backgroundColor: "#000005", height: 1080 } } >
      <Playbar
        backLocation="/overview/"
        employer_id={ employer_id }
        read={ read }
        labels={ labels }
        startTime={ startTime }
        backState={ { employer_id: employer_id, labels: labels, read: read, startTime: startTime } }
      />
      <Table>
        <tbody>
          <tr>
            <td style={ {
                backgroundColor: "#353535",
                backgroundImage: "-webkit-radial-gradient(bottom, #000005, #353535)",
                width: "45%",
                borderStyle: "inset"
              } }
            >
              <Table>
                <tbody>
                  <tr>
                    { /* Display employ details table */}
                    <td style={ { backgroundColor: "transparent" } }>
                      <EmployerDetails employer_id={ employer_id } disableSocialButton={ true } />
                    </td>
                  </tr>
                  <tr>
                    { /* Display selected steps and their labels */}
                    <td style={ { backgroundColor: "transparent", maxWidth: 300, height: 360 } }>
                      <StepsContainer labels={ labels } />
                    </td>
                  </tr>
                </tbody>
              </Table>
              </td>
            { /* Display character emails list */ }
            <td style={ {
              backgroundImage: 'url("/control-panel.gif")',
              backgroundColor: "#000005",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50% 70%",
              color: "white",
              width: "55%",
              height: 800
            } } >
              <EmailsList
                read={ read }
                emails={ getEmployerSteps(employer_id, "email") }
                openEmail={ setOpenEmail }
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <audio className="scanning-track" >
        <source src="/audio/scanning.mp3" ></source>
      </audio>
    </div>
  );
}

export default Emails;
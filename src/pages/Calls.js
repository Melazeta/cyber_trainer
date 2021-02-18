import React, { useState, useEffect } from "react";
import { playAudio, getEmployerSteps } from "../utils";
import { Table } from "react-bootstrap";
import { Playbar } from "../components/Playbar";
import { EmployerDetails } from "../components/EmployerDetails";
import { CallsRegister } from "../components/CallsRegister";
import { StepsContainer } from "../components/StepsContainer";
import { Redirect } from "react-router-dom";


// Show the calls history of the character
function Calls(props) {
  const startTime = props.location.state.startTime;
  const read = props.location.state.read;
  const employer_id = props.location.state.employer_id;
  const labels = props.location.state.labels;

  // Selected call (to open)
  const [ openCall, setOpenCall ] = useState(false);

  useEffect(() => {
    document.title = "Cyber Trainer - Emails";
    playAudio("scanning-track");
  }, []);

  // If user click on a call, then redirect it to call viewer page
  if (openCall)
    return <Redirect to={ {
      pathname: "/call-viewer/",
      state: {
        employer_id: employer_id,
        labels: labels,
        call_id: openCall,
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
                    { /* Display relationship graph */}
                    <td style={ { backgroundColor: "transparent", maxWidth: 300, height: 360 } }>
                      <StepsContainer labels={ labels } />
                    </td>
                  </tr>
                </tbody>
              </Table>
              </td>
            { /* Display player control buttons to access to each category (email, sites, conversations, ...) */ }
            <td style={ {
              backgroundImage: 'url("/control-panel.gif")',
              backgroundColor: "#000005",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50% 70%",
              color: "white",
              width: "55%",
              height: 800
            } } >
              <CallsRegister
                read={ read }
                calls={ getEmployerSteps(employer_id, "call") }
                openCall={ setOpenCall }
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

export default Calls;
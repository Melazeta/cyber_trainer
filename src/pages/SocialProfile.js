import React, { useEffect } from "react";
import { playAudio } from "../utils";
import { Table } from "react-bootstrap";
import { Playbar } from "../components/Playbar";
import { StepsContainer } from "../components/StepsContainer";

import "../css/labels.css";


// Show the character profile page with his data
function SocialProfile(props) {
  const startTime = props.location.state.startTime;
  // Steps read
  const read = props.location.state.read;
  const employer_id = props.location.state.employer_id;
  const labels = props.location.state.labels;

  useEffect(() => playAudio("scanning-track"), []);

  return (
    <div style={ { backgroundColor: "#000005", height: 1080 } } >
      <Playbar
        backLocation="/overview/"
        employer_id={ employer_id }
        read={ read }
        labels={ labels }
        startTime={ startTime }
        backState={ {
          employer_id: employer_id,
          labels: labels,
          read: read,
          startTime: startTime
        } }
      />
      <Table>
        <tbody>
          <tr>
            <td style={ {
                backgroundColor: "#353535",
                backgroundImage: "-webkit-radial-gradient(bottom, #000005, #353535)",
                width: "35%",
                height: 200,
                paddingBottom: 75,
                borderStyle: "inset"
              } }
            >
              <StepsContainer labels={ labels } />
            </td>
            { /* Display player control buttons to access to each category (email, sites, conversations, ...) */ }
            <td style={ {
              backgroundImage: 'url("/control-panel.gif")',
              backgroundColor: "#000005",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50% 70%",
              color: "white",
              width: "65%",
              height: 800
            } } >
              <div style={ { backgroundColor: "rgba(0, 0, 12, 0.75)" } } >
                <h1>Social profile page</h1>
              </div>
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

export default SocialProfile;
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { playAudio } from "../utils";
import { Playbar } from "../components/Playbar";
import { EmployerDetails } from "../components/EmployerDetails";
import { SiteContainer } from "../components/SiteContainer";
import { StepsContainer } from "../components/StepsContainer";


// Show a preview of site
function SiteViewer(props) {
  const startTime = props.location.state.startTime;
  const employer_id = props.location.state.employer_id;
  const site_id = props.location.state.site_id;
  const [ labels, setLabels ] = useState(props.location.state.labels);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    document.title = "Cyber Trainer - Call Viewer";
    playAudio("scanning-track");
  }, []);

  // Add to read list the site id
  let read = props.location.state.read;
  read.sites.push(site_id);

  return (
    <div style={ { backgroundColor: "#000005", height: 1080 } } >
      <Playbar
        backLocation="/web-history/"
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
                width: "35%",
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
              width: "65%",
              height: 800
            } } >
              <div style={ { backgroundColor: "rgba(0, 0, 12, 0.75)" } } >
                <SiteContainer
                  employer_id = { employer_id }
                  site_id={ site_id }
                  labels={ labels }
                  setLabels={ label_id => { setLabels(label_id); forceUpdate() } }
                />
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

export default SiteViewer;
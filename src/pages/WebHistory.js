import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { playAudio, openProgress } from "../utils";
import { Table, Button, Image } from "react-bootstrap";
import { Playbar } from "../components/Playbar";
import { EmployerDetails } from "../components/EmployerDetails";
import { StepsContainer } from "../components/StepsContainer";
import { VisitedSites } from "../components/VisitedSites";


// Show the web history (visited website) of the character
function WebHistory(props) {
  const startTime = props.location.state.startTime;
  const read = props.location.state.read;
  const employer_id = props.location.state.employer_id;
  const labels = props.location.state.labels;
  // Redirect to site preview page
  const [ openSite, setOpenSite ] = useState(false);
  // Refirect to download page
  const [ openDownloads, setOpenDownloads ] = useState(false);

  useEffect(() => {
    document.title = "Cyber Trainer - Emails";
    playAudio("scanning-track");
  }, []);

  // If user click on a chat, then redirect it to site viewer page
  if (openSite)
    return <Redirect to={ {
      pathname: "/site-viewer/",
      state: {
        employer_id: employer_id,
        labels: labels,
        site_id: openSite,
        read: read,
        startTime: startTime
      } } }
    />;

  if (openDownloads)
    return <Redirect to={ {
      pathname: "/downloads/",
      state: {
        employer_id: employer_id,
        labels: labels,
        read: read,
        startTime: startTime
      } } }
    />;

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
              <Button
                variant="outline-info"
                style={ { float:"right", marginTop: 50, marginRight: 50, width: 75, height: 60 } }
                onClick={ () => openProgress(() => setOpenDownloads(true)) }
              >
                <Image style={ { width: "100%", height: "100%" } } src="/icons/download.png" ></Image>
              </Button>
              <VisitedSites employer_id={ employer_id } openSite={ setOpenSite } />
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

export default WebHistory;
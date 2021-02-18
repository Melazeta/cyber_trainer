import React from "react";
import { Playbar } from "../components/Playbar";
import { StepsContainer } from "../components/StepsContainer";
import { Table } from "react-bootstrap";


function FinalReport(props) {
  const state = props.location.state;
  const { employer_id } = state;
  const { read } = state;
  const { labels } = state;
  const { startTime } = state;

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
                width: "40%",
                height: 200,
                paddingBottom: 75,
                borderStyle: "inset"
              } }
            >
              { labels && <StepsContainer labels={ labels } /> }
            </td>
            { /* Display player control buttons to access to each category (email, sites, conversations, ...) */ }
            <td style={ {
              backgroundImage: 'url("/control-panel.gif")',
              backgroundColor: "#000005",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50% 70%",
              color: "white",
              width: "60%",
              height: 800
            } } >
              <div style={ { backgroundColor: "rgba(0, 0, 12, 0.75)" } } >
                <h4 className="polaris" >Confirm your label to display final score</h4>
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

export default FinalReport;
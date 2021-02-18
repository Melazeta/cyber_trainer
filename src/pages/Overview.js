import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { backendPath, requestConfig, caseData, setCaseData } from "../auth";
import { aiMessage } from "../utils";
import { Table } from "react-bootstrap";
import { Playbar } from "../components/Playbar";
import { EmployerDetails } from "../components/EmployerDetails";
import { ControlPanel } from "../components/ControlPanel";
import { RelationsheepGraph } from "../components/RelationsheepGraph";

import "../css/overview.css";


// Main page after case selection.
// It's display the relatonshep graph, the player tools panel and the character data
function Overview(props) {
  const state = props.location.state ? props.location.state : {
    // Steps read
    read: {
      emails: [],
      calls: [],
      chats: [],
      sites: []
    },

  };
  // Retrives labels from location state or initialize blank labels
  // Es. struttura => { "EL0001": ["LL0002", "LL0005"], "CT0002": [ "LL0001" ] }
  const labels = state.labels ? state.labels : {};
  const startTime = state.startTime ? state.startTime : new Date().getTime();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  // The character focussed in the relationship graph
  const [ focussed, setFocussed ] = useState(state.employer_id);
  const [ error, setError ] = useState(false);

  // Retrives all case data (characters, steps, labels, ...)
  const getCaseData = case_id => {
    const caseUrl = backendPath("/api/cases/");
    setError(false);

    axios.post(caseUrl, { case_id: case_id }, requestConfig()).then(res => {
      if (res.status === 200) {
        setCaseData(Object.assign({}, res.data, { startTime: new Date().getTime() }));
        setFocussed(res.data.focussed_character);

        forceUpdate();
      }
      else {
        setError(true);
      }
    }).catch(e => {
      setError(true);
    });
  }

  useEffect(() => {
    document.title = "Cyber trainer - " + caseData().title;

    // If case characters data haven't been updated, trieve it from the backend
    if (!caseData() || (typeof caseData().characters[0] === "string"))
      getCaseData(caseData().case_id);

    // If no one character is focussed, set the default case focussed character
    if (!focussed)
      setFocussed(caseData().focussed_character);

    // Display welcome message
    if (state.firstOpening && caseData().welcome_message)
      aiMessage(caseData().welcome_message, 500);
  }, []);

  return (
    <div style={ { backgroundColor: "#000005", height: 1080 } } >
      <Playbar employer_id={ focussed } read={ state.read } labels={ labels } startTime={ startTime } />
      <Table>
        <tbody>
          <tr>
            <td style={ {
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
                      <EmployerDetails
                        startTime={ startTime }
                        employer_id={ focussed }
                        read={ state.read }
                        labels={ labels }
                      />
                    </td>
                  </tr>
                  <tr>
                    { /* Display relationship graph */}
                    <td style={ { backgroundColor: "#000005", maxWidth: 300, height: "99%" } } >
                      <RelationsheepGraph
                        selectCharacter={characterID => setFocussed(characterID) }
                        edges={ caseData().links }
                        characters={ caseData().characters }
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
              </td>
            { /* Display player control buttons to access to each category (email, sites, conversations, ...) */}
            <td style={ {
              backgroundImage: 'url("/control-panel.gif")',
              backgroundColor: "#000005",
              backgroundRepeat: "no-repeat",
              backgroundSize: "50% 70%",
              color: "white",
              width: "55%",
              height: 800
            } } >
              <ControlPanel
                startTime={ startTime }
                employer_id={ focussed }
                read={ state.read }
                labels={ labels }
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Overview;
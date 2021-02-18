import React, { useState } from "react";
import { backendPath, caseData } from "../auth";
import { openProgress, millis2MinSec } from "../utils";
import { Table, Image } from "react-bootstrap";

import "../css/text.css";


export function CallsRegister(props) {
  const read = props.read;
  // Callback to set call to open (clicked)
  const openCall = props.openCall;
  const [ hover, setHover ] = useState(false);

  const retrivesCallsData = calls => {
    let _calls = [];

    // Iterate over calls
    for (let i = 0; i < calls.length; i++) {
      // For each character
      for (let character_id in caseData().characters) {
        // Search the caller
        if (caseData().characters[character_id].calls.findIndex(
          call => { return (call.call_id === calls[i].call_id && call.role_id === 1)}
        ) !== -1)
          // Retrive caller data (telephone number, name, ...)
          _calls.push(
            Object.assign(
            {},
            calls[i],
            { from: caseData().characters[character_id] }
          ));
      }
    }

    return _calls;
  }
  const calls = retrivesCallsData(props.calls);

  return (
    <div>
      <h4 className="polaris text-light unselectable" >Calls register</h4><br />
      <Table
        className="polaris-sm text-light unselectable"
        style={ { backgroundColor: "rgba(28, 28, 35, 0.85)" } }
      >
        <tbody>
        {
          calls.map((call, index) => (
            <tr
              key={ index }
              onMouseLeave={ () => setHover(false) }
              onMouseEnter={ () => setHover(index) }
              onClick={ () => openProgress(() => openCall(call.call_id)) }
              style={ { maxHeight: 30, backgroundColor: index === hover ? "#20639B" : "transparent" } }
            >
              <React.Fragment>
                <td style={ { width: 150 } }>
                  <Image
                    style={ { width: 100, height: 100 } }
                    src={ backendPath("/media/" + call.from.avatar) }
                    thumbnail
                  />
                </td>
                <td>
                  <Table borderless >
                    <tbody className="text-light" >
                      <tr>
                        <td>
                          { (read.calls.indexOf(call.call_id) === -1) ?
                            <h5><b>
                              { 
                                (call.from.first_name || call.from.last_name) ?
                                call.from.first_name + " " + call.from.last_name : "Unknown"
                              }
                            </b></h5> :
                            <h5>
                            { 
                              (call.from.first_name || call.from.last_name) ?
                              call.from.first_name + " " + call.from.last_name : "Unknown"
                            }</h5>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Image style={ { marginTop: -20, width: 30, height: 30 } } src="/incoming-call.png" />
                          <h6 style={ { marginTop: -30, marginLeft: 50, color: "#DDDDDD" } }>
                          { (read.calls.indexOf(call.call_id) === -1) ?
                            <b>
                              {
                                call.from.telephone ? call.from.telephone.substr(0, 3) + " " +
                                call.from.telephone.substr(3) : "Private number"
                              }
                            </b> :
                            call.from.telephone ? call.from.telephone.substr(0, 3) + " " +
                            call.from.telephone.substr(3) : "Private number"
                          }
                          </h6>
                        </td>
                        <td>
                          <h6 className="ace" style={ { marginTop: -70, marginLeft: 50 } }>Received
                            <div>
                              <h6 className="polaris-sm" >
                              { call.received }
                              </h6>
                            </div>
                          </h6>
                          <h6 className="ace" style={ { marginLeft: 50 } }>Duration
                            <div>
                              <h6 className="polaris-sm" >
                                { millis2MinSec(new Date(call.closed) - new Date(call.received)) } mins
                              </h6>
                            </div>
                          </h6>
                        </td>
                        <td>
                          {
                            (read.calls.indexOf(call.call_id) === -1) ?
                              <h2 style={ { marginTop: -30 } } >•</h2> : ""
                          }
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </td>
              </React.Fragment>
            </tr>
        )) }
        </tbody>
      </Table>
      { calls.length === 0 && <h4
          className="polaris text-light"
          style={ { color: "white", textAlign: "center", marginTop: "10%" } }
        >No Incoming calls to display</h4>
      }
      <audio className="softClick-track" >
        <source src="/audio/soft_click.mp3" ></source>
      </audio>
    </div>
  );
}
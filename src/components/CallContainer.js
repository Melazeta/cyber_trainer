import React from "react";
import { Navbar, Image, Table, Button } from "react-bootstrap";
import { caseData, backendPath } from "../auth";
import { genLabels, playAudio, aiMessage, retrivesConversationData } from "../utils";
import { Label } from "./Label";

import "../css/text.css"


// TODO Add characted id to display his avatar
export function CallContainer(props) {
  const employer_id = props.employer_id;
  const call_id = props.call_id;
  const labels = props.labels;
  const setLabels = props.setLabels;
  const call = retrivesConversationData(
    caseData().sections.calls[call_id],
    "call"
  );

  const playConversation = () => {
    if (call.audio)
      playAudio("call-track");
    else {
      playAudio("locked-track");
      aiMessage("Ops... I can't find any audio related this conversation.");
    }
  }

  const Dialogue = ({ _labels, from, index }) => {
    return (
      <tr key={ index } >
        <td style={{ float: from === 1 ? "left" : "right" }}>
          <Navbar>
            { from === 1 && <Image
            src={ backendPath("/media/" + call.from.avatar) }
            style={ { width: 85, height: 85, marginTop: -22, marginRight: 5 } }
            /> }
            <div style={ {
              backgroundColor: from === 1 ? "#2BBBAD" : "#DDDDDD",
              borderRadius: 2,
              marginTop: -20,
              padding: 25,
              whiteSpace: "pre-line",
              color: "#000005"
            } } >
            {
              _labels.map((label, index) => (
                <Label
                  key={ index }              
                  employer_id={ employer_id }
                  labels={ labels }
                  setLabels={ setLabels }
                  step_id={ call_id }
                  label={ label }
                />
              ))
            }
            </div>
            { from === 2 && <Image
            src={ backendPath("/media/" + caseData().characters[employer_id].avatar) }
            style={ {  width: 85, height: 85, marginTop: -22, marginLeft: 5 } }
            /> }
          </Navbar>
       </td>
      </tr>
    );
  }

  return (
    <div>
      <Navbar style={ {
            backgroundImage: "-webkit-radial-gradient(center, #000005, #353545)",
            opacity: 0.9,
            height: 125
          } }
        >
        <Image
          src={ backendPath("/media/" + call.from.avatar) }
          style={ { width: 90, height: 90 } }
          thumbnail
        />
        <h4 className="polaris" style={ { marginTop: -50, marginLeft: 35 } } ><b>
          { call.from.first_name + " " + call.from.last_name }
        </b></h4><br />
        <div className="ace" style={ { marginTop: 20, marginLeft: -285, display: "inline-block" } } >
          <Image style={ { marginTop: 20, width: 25, height: 25 } } src="/incoming-call.png" />
          <h4 style={ { marginTop: -30, marginLeft: 45 } } >
            { call.from.telephone.substr(1, 3) + " " + call.from.telephone.substr(3) }
          </h4>
        </div>
        <Button
          variant="outline-info"
          onClick={ playConversation }
          style={ { marginTop: 40, marginLeft: 75, width: 50, height: 40 } }
        >
          <Image style={ { width: "100%", height: "100%" } } src="/icons/audio.png" />
        </Button>
      </Navbar>
      <div className="scrollbar scrollbar-default mt-5 mx-auto" style={ { overflow: "auto", height: 600 } } >
        <Table className="ace text-light unselectable" >
          <tbody>
            {
              call.dialogues.map((message, index) => (
                <Dialogue
                  key={ index }
                  from={ message.from }
                  _labels={ genLabels(message.text, message.labels, labels, call_id) }
                />
              ))
            }
          </tbody>
        </Table>
      </div>
      {
        call.audio &&
        <audio className="call-track" >
          <source src={ backendPath("/media/audio/" + call.audio) } ></source>
        </audio>
      }
      <audio className="softClick-track" >
        <source src="/audio/soft_click.mp3" ></source>
      </audio>
      <audio className="locked-track" >
        <source src="/audio/locked.mp3" ></source>
      </audio>
    </div>
  )
}
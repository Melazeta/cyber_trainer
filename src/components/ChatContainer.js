import React from "react";
import { Navbar, Image, Table } from "react-bootstrap";
import { caseData, backendPath } from "../auth";
import { genLabels, retrivesConversationData } from "../utils";
import { Label } from "./Label";

import "../css/text.css"


// TODO Add characted id to display his avatar
export function ChatContainer(props) {
  const employer_id = props.employer_id;
  const chat_id = props.chat_id;
  const labels = props.labels;
  const setLabels = props.setLabels;
  const chat = retrivesConversationData(
    caseData().sections.chats[chat_id],
    "chat"
  );

  const Message = ({ _labels, from, index }) => {
    return (
      <tr key={ index } >
        <td style={{ float: from === 1 ? "left" : "right" }}>
          <Navbar>
            { from === 1 && <Image
            src={ backendPath("/media/" + chat.from.avatar) }
            style={ { width: 50, height: 50, borderRadius: "50%", marginRight: 25 } }
            /> }
            <div style={ {
              backgroundColor: from === 1 ? "#2BBBAD" : "#DDDDDD",
              borderRadius: 5,
              padding: 10,
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
                  step_id={ chat_id }
                  label={ label }
                />
              ))
            }
            </div>
            { from === 2 && <Image
            src={ backendPath("/media/" + caseData().characters[employer_id].avatar) }
            style={ { width: 50, height: 50, borderRadius: "50%", marginLeft: 25 } }
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
            opacity: 0.9 
          } }
        >
        <Image
          src={ backendPath("/media/" + chat.from.avatar) }
          style={ { width: 90, height: 90 } }
          roundedCircle
        />
        <h4 className="polaris" style={ { marginTop: -25, marginLeft: 35 } } ><b>
          { chat.from.first_name + " " + chat.from.last_name }
        </b></h4><br />
        <div className="ace" style={ { marginTop: 50, marginLeft: -285 } } >
        {
          Math.random() < 0.5 ?
          <h4>Last seen few minutes ago...</h4> :
          <div>
            <div style={ {
                width: 20, height: 20,
                backgroundColor: "#25D366",
                borderRadius: "50%"
              } }
            >
            <h4 style={ { marginLeft: 30 } } >Online</h4>
            </div>
          </div>
        }
        </div>
      </Navbar>
      <div className="scrollbar scrollbar-default mt-5 mx-auto" style={ { overflow: "auto", height: 600 } } >
        <Table className="ace text-light unselectable" borderless >
          <tbody>
            {
              chat.messages.map((message, index) => (
                <Message
                  key={ index }
                  from={ message.from }
                  _labels={ genLabels(message.text, message.labels, labels, chat_id) }
                />
              ))
            }
          </tbody>
        </Table>
      </div>
      <audio className="softClick-track" >
        <source src="/audio/soft_click.mp3" ></source>
      </audio>
    </div>
  )
}
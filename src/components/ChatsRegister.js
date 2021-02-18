import React, { useState } from "react";
import { backendPath, caseData } from "../auth";
import { openProgress, genLabels } from "../utils";
import { Table, Image } from "react-bootstrap";

import "../css/text.css";


export function ChatsRegister(props) {
  const read = props.read;
  const labels = props.labels;
  // Callback to set chat to open (clicked)
  const openChat = props.openChat;
  // Maximum text characters to display in the preview
  const MAX_TEXT_PREVIEW = 40;
  const [ hover, setHover ] = useState(false);

  const retrivesChatsData = chats => {
    let _chats = [];

    // Iterate over chats
    for (let i = 0; i < chats.length; i++) {
      // For each character
      for (let character_id in caseData().characters) {
        // Search the character
        if (caseData().characters[character_id].chats.findIndex(
            chat => { return (chat.chat_id === chats[i].chat_id && chat.role_id === 1)}
        ) !== -1)
          // Retrive character data (telephone number, name, ...)
          _chats.push(
            Object.assign(
            {},
            chats[i],
            { from: caseData().characters[character_id] }
          ));
      }
    }

    return _chats;
  }
  const chats = retrivesChatsData(props.chats);

  const getChatText = (chat, maxLenght) => {
    const message = chat.messages[chat.messages.length - 1];
    let text = "";

    genLabels(message.text, message.labels, labels, chat.chat_id).forEach(
        label => text += label.text
    );

    return text.length > maxLenght ? text.substr(0, maxLenght) + "..." : text;
  }

  console.log(caseData());

  return (
    <div>
      <h4 className="polaris text-light unselectable" >Chats</h4><br />
      <Table
        className="polaris-sm text-light unselectable"
        style={ { backgroundColor: "rgba(28, 28, 35, 0.85)" } }
      >
        <tbody>
        {
          chats.map((chat, index) => (
            <tr
              key={ index }
              onMouseLeave={ () => setHover(false) }
              onMouseEnter={ () => setHover(index) }
              onClick={ () => openProgress(() => openChat(chat.chat_id)) }
              style={ { maxHeight: 30, backgroundColor: index === hover ? "#20639B" : "transparent" } }
            >
              <React.Fragment>
                <td style={ { width: 150 } }>
                  <Image
                    style={ { width: 100, height: 100, borderRadius: "50%" } }
                    src={ backendPath("/media/" + chat.from.avatar) }
                  />
                </td>
                <td>
                  <Table borderless >
                    <tbody className="text-light" >
                      <tr>
                        <td>
                          { (read.chats.indexOf(chat.chat_id) === -1) ?
                            <h5><b>
                              { 
                                (chat.from.first_name || chat.from.last_name) ?
                                chat.from.first_name + " " + chat.from.last_name : "Unknown"
                              }
                            </b></h5> :
                            <h5>
                            { 
                              (chat.from.first_name || chat.from.last_name) ?
                              chat.from.first_name + " " + chat.from.last_name : "Unknown"
                            }</h5>
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h6 className="ace" style={ { marginTop: -20, color: "#DDDDDD" } }>
                            { getChatText(chat, MAX_TEXT_PREVIEW) }
                          </h6>
                        </td>
                        <td>
                          <h6 className="ace" style={ { marginTop: -70, marginLeft: 50 } }>Received
                            <div>
                              <h6 className="polaris-sm" >
                              { chat.messages[0].datetime }
                              </h6>
                            </div>
                            { (read.chats.indexOf(chat.chat_id) === -1) ? <h2>•</h2> : "" }
                          </h6>
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
      { chats.length === 0 && <h4
          className="polaris text-light"
          style={ { color: "white", textAlign: "center", marginTop: "10%" } }
        >No chats to display</h4>
      }
      <audio className="softClick-track" >
        <source src="/audio/soft_click.mp3" ></source>
      </audio>
    </div>
  );
}
import React from "react";
import { caseData } from "../auth";
import { fillTextLabel } from "../utils";

import "../css/scrollbar.css";
import "../css/text.css";


export function StepsContainer(props) {
  const steps = props.labels;

  const getstepTitle = step_id => {
    const sections = caseData().sections;

    if (step_id in sections.emails)
      return fillTextLabel(step_id, sections.emails[step_id].object, "email");

    if (step_id in sections.chats)
      return "Chat on " + sections.chats[step_id].messages[
        sections.chats[step_id].messages.length - 1].datetime;
    
    if (step_id in sections.calls) 
      return "Call on " + sections.calls[step_id].received;
    
    if (step_id in sections.sites)
      return fillTextLabel(step_id, sections.sites[step_id].title, "site");

      if (step_id in sections.files)
      return fillTextLabel(step_id, sections.files[step_id].base_name, "file");

    return step_id;
  }

  return (
    <div
      className="scrollbar scrollbar-default mt-5 mx-auto"
      style={ { backgroundColor: "transparent", overflow: "auto", height: "99%" } }
    >
      <h4
        className="polaris text-light unselectable"
        style={ { position: "fixed", marginTop: -35 } }
      >Collected labels</h4>
      <br />
      {
        Object.keys(steps).sort().map((step_id, index) => (
          <div key={ index } >
            <p className="text-light polaris unselectable" >
              {
                caseData().characters[steps[step_id].employer_id].first_name + " " +
                caseData().characters[steps[step_id].employer_id].last_name +
                " - " + getstepTitle(step_id)
              }
            </p>
            <div>
              {
                Object.keys(steps[step_id].labels).sort().map((label_id, index) => (
                  <p
                    key={ index }
                    className="text-light ace unselectable"
                    style={ { marginLeft: 20 } }
                  >{ steps[step_id].labels[label_id] }</p>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}
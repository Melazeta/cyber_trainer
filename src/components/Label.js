import React from "react";
import { playAudio } from "../utils";

import "../css/labels.css";


export function Label(props) {
  // TODO Add title label data to display in StepsContainer (trasformare labels da array in dizionario)
  const addLabel = (step_id, label) => {
    let _labels = props.labels;
    const employer_id = props.employer_id;

    playAudio("softClick-track");
    // If clicked label was already selected, remove it from labels
    if (_labels[step_id] && _labels[step_id].labels[label.label_id])
      // Remove step's label
      delete _labels[step_id].labels[label.label_id];
      // Otherwise add the label clicked
    else {
      if (!_labels[step_id])
        _labels[step_id] = {
          employer_id: employer_id,
          labels: {}
        };

      _labels[step_id].labels[label.label_id] = label.text;
    }
    
    if (Object.keys(_labels[step_id].labels).length === 0)
      delete _labels[step_id];
    
    props.setLabels(_labels);
  }

  return (
    <React.Fragment>
      { props.label.relevant !== undefined ?
        <mark
            className={ props.label.selected ? "selected" : "uselected" }
            onClick={ () => addLabel(props.step_id, props.label) }
        >{ props.label.text }</mark> : props.label.text
      }
    </React.Fragment>
  )
}
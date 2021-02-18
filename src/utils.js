import swal from "sweetalert";
import { caseData } from "./auth";

import "./css/text.css";
import "./css/message.css";


// Display ai assistant message
export const aiMessage = (message, delay=0, textButton="Got it") => {
    let messageInterval = setInterval(() => {
        swal(message, {
            icon: "/ai.gif",
            className: "ai-message",
            closeOnClickOutside: false,
            button: {
              text: textButton,
            },
          }).then(clearInterval(messageInterval));
          document.getElementsByClassName("swal-text").item(0).style.color = "white";
          document.getElementsByClassName("swal-text").item(0).style["text-align"] = "center";
          document.getElementsByClassName("swal-text").item(0).style["font-family"] = "Polaris";
    }, delay);
}

// Play audio
export const playAudio = audioClass => {
    let audioEls = document.getElementsByClassName(audioClass);

    if (audioEls.length > 0)
        audioEls.item(0).play()
}

// Generate labels from step
export const genLabels = (text, step_labels, stored_labels, step_id, sep="|") => {
    let new_labels = [];

    text.split(sep).forEach(t => { if (t) new_labels.push(
      step_labels[t] ? {
        text: step_labels[t].content,
        relevant: step_labels[t].relevant,
        label_id: t,
        selected: (stored_labels[step_id] && stored_labels[step_id].labels[t])
      } : { text: t })
    });

    return new_labels;
}

// Retrive employer steps list of a category (emails, calls, chats, ...)
export const getEmployerSteps = (employer_id, category) => {
  const category_id = category + "_id";
  let steps = [];

  for (let i = 0; i < caseData().characters[employer_id][category + "s"].length; i++) {
    // Retrive all employer received steps (role_id = 2)
    if (caseData().characters[employer_id][category + "s"][i].role_id === 2) {
      let _tmp = {};

      _tmp[category_id] = caseData().characters[employer_id][category + "s"][i][category_id];
      steps.push(
        Object.assign(
          {},
          caseData().sections[category + "s"][caseData().characters[
            employer_id][category + "s"][i][category_id]],
          _tmp
        )
      )
    }
  }

  return steps;
}

export const retrivesConversationData = (conversation, category) => {
  // For each character
  for (let character_id in caseData().characters) {
    // Search the character
    if (caseData().characters[character_id][category + "s"].findIndex(
      conversation => {
        return (
          conversation[category + "_id"] === conversation[category + "_id"] &&
          conversation.role_id === 1
        )
      }
    ) !== -1)
      // Retrive character data (telephone number, name, ...)
      return Object.assign(
        {},
        conversation,
        { from: caseData().characters[character_id] }
      );
  }

  return null;
}

// Convert millis to minutes and seconds string
export const millis2MinSec = millis => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

// Loading screen for steps opening
export const openProgress = callback => {
  playAudio("softClick-track");
  swal("", {
    timer: 500,
    icon: "/spinner2.gif",
    closeOnClickOutside: false,
    className: "back-progress",
    buttons: false
  }).then(callback);
}

// Convert datetime to formatted string
export const getFormattedDate = (datetime) => {
  const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
      
    return n.length >= width ? n : new Array(
      width - n.length + 1).join(z) + n;
  }
  
  const currentDatetime = new Date();
  const day = pad(currentDatetime.getDate(), 2);
  const month = pad(currentDatetime.getMonth() + 1, 2);
  const year = "" + currentDatetime.getFullYear();

  // Visited today
  if (new Date("00:00:00 " + day + "/" + month + "/" + year) <= datetime)
    return "Today";
    
  // Visited yesterday
  if (new Date("00:00:00 " + pad(
      currentDatetime.getDate() -1, 2) + "/" + month + "/" + year) <= datetime
    )
    return "Yesterday";
    
  // Visited more than two day ago
  return (
      ("" + pad(datetime.getDate(), 2)) +       // Get day
      ("/" + pad(datetime.getMonth() + 1, 2)) + // Get month
      ("/" + datetime.getFullYear())            // Get year
  )
}

export const fillTextLabel = (step_id, text, category) => {
  text = text.split("|");

  for (let i = 0; i < text.length; i++) {
    const label = caseData().sections[category + "s"][step_id].labels[text[i]];
    if (text[i] && label)
      text[i] = label.content;
  }

  return text.join("");
}
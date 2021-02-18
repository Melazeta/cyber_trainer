import React from "react";
import { playAudio } from "../utils";
import { Table, Image } from "react-bootstrap";

import "../css/text.css";


// Display the cases list
export function CasesList(props) {
  const { cases, selectCase } = props;

  return (
    <div style={ { backgroundColor: "transparent", width: 420 } } >
      <br />
      <h4 className="text-light unselectable" >Cases</h4><br /><br />
      <Table className="unselectable" striped bordered hover variant="dark" >
        <tbody>
          { /* List already solved cases (levels) */}
          { cases.solved_cases.map(c => (
            <tr key={ c.case_id} onClick={ () => { playAudio("softClick-track"); selectCase(c.case_id) } } >
              <td>{ c.level_number }</td>
              <td>{ c.title }</td>
              <td>
                <Image style={ { width: 125, height: 25 } } src="/icons/5-stars.png" />
              </td>
            </tr>
            ))
          }
          { /* Show next case (unlocked level) */}
          { cases.next_case && (
            <tr key={ cases.next_case.case_id} onClick={ () => { playAudio("softClick-track"); selectCase(
              cases.next_case.case_id) } }
            >
              <td>{ cases.next_case.level_number }</td>
              <td>{ cases.next_case.title }</td>
              <td style={ { width: 150, textAlign: "center" } } >
                <Image style={ { width: 125, height: 25 } } src="/icons/0-stars.png" />
              </td>
            </tr>
          )}
          { /* Show locked case (will be unlocked after solving the unlocked case) */}
          { cases.locked_case && (
            <tr key={ cases.locked_case.case_id} onClick={ () => { playAudio("locked-track"); selectCase(
              cases.locked_case.case_id) } }
              style={ { opacity: 0.7 } }
            >
              <td>{ cases.locked_case.level_number }</td>
              <td>{ cases.locked_case.title }</td>
              <td style={ { textAlign: "center" } } >
                <Image style={ { width: 25, height: 25 } } src="/icons/lock.png" />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <audio className="softClick-track" >
        <source src="/audio/soft_click.mp3" ></source>
      </audio>
      <audio className="locked-track" >
        <source src="/audio/locked.mp3" ></source>
      </audio>
    </div>
  );
}
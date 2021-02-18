import React from "react";
import { caseData, backendPath } from "../auth";
import { genLabels } from "../utils";
import { Image, Table } from "react-bootstrap";
import { Label } from "./Label";

import "../css/labels.css";
import "../css/text.css";


export function EmailContainer(props) {
  const email_id = props.email_id;
  const employer_id = props.employer_id;
  const labels = props.labels;
  const setLabels = props.setLabels;
  const email = caseData().sections.emails[email_id];

  return (
    <div>
      <div style={ { wordBreak: "break-all" } } >
        <div style={ { margin: 20, display: "inline-block"} } >
          <Table>
            <tr>
              <td style={ { width: 100 } }>
              <Image
                src={ backendPath("/media/" + email.avatar) }
                style={ { width: 90, height: 90, marginTop: 30 } }
              />
              </td>
              <td>
                <Table className="text-light polaris unselectable" borderless >
                  <tr>
                    <th style={ { width: 135 } }>from:</th>
                    <td className="ace"><b>{ genLabels(
                        email.from_name,
                        email.labels,
                        labels,
                        email_id
                      ).map((label, index) => ( 
                        <Label
                          key={ index }
                          employer_id={ employer_id }
                          labels={ labels }
                          setLabels={ setLabels }
                          step_id={ email_id }
                          label={ label }
                        />
                    ))}</b>{ " <" }{ genLabels(
                        email.from_email,
                        email.labels,
                        labels,
                        email_id
                      ).map((label, index) => (
                        <Label
                          key={ index }
                          employer_id={ employer_id }
                          labels={ labels }
                          setLabels={ setLabels }
                          step_id={ email_id }
                          label={ label }
                        />
                    )) }{ ">" }</td>
                  </tr>
                  <tr>
                    <th>to:</th>
                    <td className="ace" >{ email.to_email }</td>
                  </tr>
                  <tr>
                    <th>object:</th>
                    <td className="ace" >{ email.object }</td>
                  </tr>
                </Table>
              </td>
            </tr>
          </Table>
        </div>
        <div className="ace unselectable" style={ { margin: 20 } } >
          <p style={ { whiteSpace: "pre-line" } } >
            {
              genLabels(email.text, email.labels, labels, email_id).map((label, index) => (
                <Label
                  key={ index }
                  employer_id={ employer_id }
                  labels={ labels }
                  setLabels={ setLabels }
                  step_id={ email_id }
                  label={ label }
                />
              ))
            }
          </p>
        </div>
      </div><br />
      { /* Attachments container */}
      <div style={ { margin: 20, display: "inline-block"} } >
        { email.attachments.lenght > 0 && <h5 className="polaris" >Attachments</h5> }
        { email.attachments.map((attachment, index) => (
          <div style={ { marginRight: 20 } } >
            <Table>
              <tbody>
                <tr>
                  <td>
                    <Image
                      src={ backendPath("/media/" + caseData().sections.files[attachment].icon ) }
                      style={ { width: 90, height: 90, marginTop: 0 } }
                    />
                    </td>
                  <td>
                    <h5 className="ace text-light unselectable" style={ { marginTop: 15 } } >
                      {
                        genLabels(
                          caseData().sections.files[attachment].base_name,
                          caseData().sections.files[attachment].labels,
                          labels,
                          attachment,
                        ).map((label, index) => (
                          <Label
                            key={ index }
                            employer_id={ employer_id }
                            labels={ labels }
                            setLabels={ setLabels }
                            step_id={ attachment }
                            label={ label }
                          />
                        ))
                      }
                      { "." }
                      {
                        genLabels(
                          caseData().sections.files[attachment].extention,
                          caseData().sections.files[attachment].labels,
                          labels,
                          attachment
                        ).map((label, index) => (
                          <Label
                            key={ index }
                            employer_id={ employer_id }
                            labels={ labels }
                            setLabels={ setLabels }
                            step_id={ attachment }
                            label={ label }
                          />
                        ))
                      }
                    </h5>
                    <h5 className="ace-sm unselectable" style={ { color: "#BBBBBB" } } >
                      {
                        genLabels(
                          caseData().sections.files[attachment].download_link,
                          caseData().sections.files[attachment].labels,
                          labels,
                          attachment
                        ).map((label, index) => (
                          <Label
                            key={ index }
                            employer_id={ employer_id }
                            labels={ labels }
                            setLabels={ setLabels }
                            step_id={ attachment }
                            label={ label }
                          />
                        ))
                      }
                    </h5>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        )) }
      </div>
      <audio className="softClick-track" >
        <source src="/audio/soft_click.mp3" ></source>
      </audio>
    </div>
  );
}
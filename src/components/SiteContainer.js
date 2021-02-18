import React from "react";
import { Navbar, Table, Image } from "react-bootstrap";
import { caseData, backendPath } from "../auth";
import { genLabels } from "../utils";
import { Label } from "./Label";


// Display the site page content
export function SiteContainer(props) {
  const employer_id = props.employer_id;
  const site_id = props.site_id;
  const site = caseData().sections.sites[site_id];
  const labels = props.labels;
  const setLabels = props.setLabels;

  return (
    <div>
      { /* Address navbar */}
      <Navbar>        
        <Table className="polaris text-light" borderless >
          <tbody>
            <tr style={ { backgroundColor: "#008B8B"} } >
              <td style={ { width: 100 } } >
                { /* Site's icon */}
                <Image
                  src={ backendPath("/media/" + site.icon) }
                  style={ { width: 50, height: 50 } }
                  thumbnail
                />
              </td>
              <td style={ { width: 150 } } ><p></p><h5>{ site.title }</h5></td>
              <td>
                { /* Address bar */}
                <p style={ {
                    backgroundColor: "#F0F8FF",
                    padding: 10,
                    color: "#000005",
                    display: "inline-flex",
                    flexDirection: "row",
                    flexWrap: "wrap"
                  } }
                >
                {
                  /* Display site protocol and labels */
                  genLabels(site.protocol, site.labels, labels, site_id).map((label, index) => (
                    <Label
                      key={ index }              
                      employer_id={ employer_id }
                      labels={ labels }
                      setLabels={ setLabels }
                      step_id={ site_id }
                      label={ label }
                    />
                  ))
                }://
                {
                  /* Display site domain and labels */
                  genLabels(site.domain, site.labels, labels, site_id).map((label, index) => (
                    <Label
                      key={ index }              
                      employer_id={ employer_id }
                      labels={ labels }
                      setLabels={ setLabels }
                      step_id={ site_id }
                      label={ label }
                    />
                  ))
                }
                {
                  /* Display site uri and labels */
                  genLabels(site.uri, site.labels, labels, site_id).map((label, index) => (
                    <Label
                      key={ index }              
                      employer_id={ employer_id }
                      labels={ labels }
                      setLabels={ setLabels }
                      step_id={ site_id }
                      label={ label }
                    />
                  ))
                }
                </p>
              </td>
            </tr>
          </tbody>
        </Table>
      </Navbar>
      <div>
        Site preview
      </div>
    </div>
  );
}
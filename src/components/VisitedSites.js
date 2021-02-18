import React, { useState } from "react";
import { caseData, backendPath } from "../auth";
import { openProgress, getFormattedDate, fillTextLabel } from "../utils";
import { Table, Image } from "react-bootstrap";

import "../css/scrollbar.css";


export function VisitedSites(props) {
  const employer_id = props.employer_id;
  // Callback to set site to open (clicked)
  const openSite = props.openSite;
  const [ hover, setHover ] = useState(false);
  let lastDate = null;

  // Retrive site data and sort sites by visited datetime
  const getSitesData = (sites) => {
    let sitesData = [];

    sites.forEach(site => {
      sitesData.push({
        site_id: site.site_id,
        site_data: caseData().sections.sites[site.site_id],
        downloaded: site.downloaded
      })
    });

    // Return visited sites sorted by datetime
    return sitesData.sort((a, b) => a.site_data.datetime < b.site_data.datetime);
  }
  const sites = getSitesData(caseData().characters[employer_id].sites);

  const updateLastDate = (datetime) => {
    if (lastDate !== datetime) {
      lastDate = datetime;
      return true;
    }
  
    return false;
  }

  return (
    <div>
      <h4 className="polaris text-light unselectable" >Web history</h4>
      <div
        className="scrollbar scrollbar-default mt-5 mx-auto"
        style={ { overflow: "auto", height: 600 } }
      >
        <Table
          className="polaris text-light unselectable"
          style={ { backgroundColor: "rgba(0, 0, 12, 0.7)" } }
          borderless
        >
        <tbody>
          {
            sites.map((site, index) => (
              <React.Fragment key={ index } >
                <tr>
                  <td>
                    { 
                      updateLastDate(getFormattedDate(new Date(site.site_data.datetime))) &&
                        <h5>{ lastDate }</h5>
                    }
                  </td>
                </tr>
                <tr
                  onMouseLeave={ () => setHover(false) }
                  onMouseEnter={ () => setHover(index) }
                  onClick={ () => openProgress(() => openSite(site.site_id)) }
                  style={ { maxHeight: 30, backgroundColor: index === hover ? "#20639B" : "transparent" } }
                >
                  <td style={ { width: 150} } >
                    <Image
                      style={ { width: 50, height: 50 } }
                      src={ backendPath("/media/" + site.site_data.icon) }
                      thumbnail
                    ></Image>
                  </td>
                  <td>
                    <p>{ site.site_data.title }</p>
                    <p className="ace" style={ { marginTop: -20 } } >
                      { 
                        fillTextLabel(
                          site.site_id,
                          site.site_data.protocol + "://" + site.site_data.domain + site.site_data.uri,
                          "site"
                        )
                      }
                    </p>
                  </td>
                  <td className="ace" >{ site.site_data.datetime.substr(0, 5) }</td>
                </tr>
              </React.Fragment>
            ))
          }
        </tbody>
      </Table>
      { sites.length === 0 && <h4
          className="polaris text-light"
          style={ { color: "white", textAlign: "center", marginTop: "10%" } }
        >No web sites visited</h4>
      }
    </div>
    <audio className="softClick-track" >
      <source src="/audio/soft_click.mp3" ></source>
    </audio>
  </div>
  )
}
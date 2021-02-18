import React, { useState } from "react";
import { caseData, backendPath } from "../auth";
import { openProgress, getFormattedDate, fillTextLabel } from "../utils";
import { Table, Image } from "react-bootstrap";

import "../css/scrollbar.css";


export function DownloadsContainer(props) {
  const employer_id = props.employer_id;
  // Callback to set file to open (clicked)
  const openFile = props.openFile;
  const [ hover, setHover ] = useState(false);
  let lastDate = null;

  // Retrive site data and sort sites by visited datetime
  const getDownloadsData = (downloads) => {
    let downloadsData = [];

    downloads.forEach(download => {
      downloadsData.push({
        file_id: download.file_id,
        file_data: caseData().sections.files[download.file_id],
      })
    });

    // Return visited sites sorted by datetime
    return downloadsData.sort((a, b) => a.file_data.datetime < b.file_data.datetime);
  }
  const downloads = getDownloadsData(caseData().characters[employer_id].downloads);

  const updateLastDate = (datetime) => {
    if (lastDate !== datetime) {
      lastDate = datetime;
      return true;
    }
  
    return false;
  }

  return (
    <div>
      <h4 className="polaris text-light unselectable" >Downloaded files</h4>
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
            downloads.map((file, index) => (
              <React.Fragment key={ index } >
                <tr>
                  <td>
                    { 
                      updateLastDate(getFormattedDate(new Date(file.file_data.datetime))) &&
                        <h5>{ lastDate }</h5>
                    }
                  </td>
                </tr>
                <tr
                  onMouseLeave={ () => setHover(false) }
                  onMouseEnter={ () => setHover(index) }
                  onClick={ () => openProgress(() => openFile(file.file_id)) }
                  style={ { maxHeight: 30, backgroundColor: index === hover ? "#20639B" : "transparent" } }
                >
                  <td style={ { width: 150} } >
                    <Image
                      style={ { width: 75, height: 75 } }
                      src={ backendPath("/media/" + file.file_data.icon) }
                      thumbnail
                    ></Image>
                  </td>
                  <td>
                    <p>
                      { 
                        fillTextLabel(
                          file.file_id,
                          file.file_data.base_name,
                          "file"
                        ) + "." + fillTextLabel(
                          file.file_id,
                          file.file_data.extention,
                          "file"
                        )
                      }
                    </p>
                    <p className="ace" style={ { marginTop: -20 } } >
                      { 
                        fillTextLabel(
                          file.file_id,
                          file.file_data.download_link,
                          "file"
                        )
                      }
                    </p>
                  </td>
                  <td className="ace" >{ file.file_data.datetime.substr(0, 5) }</td>
                </tr>
              </React.Fragment>
            ))
            }
        </tbody>
      </Table>
      { downloads.length === 0 && <h4
          className="polaris text-light"
          style={ { color: "white", textAlign: "center", marginTop: "10%" } }
        >No files downloaded</h4>
      }
    </div>
    <audio className="softClick-track" >
      <source src="/audio/soft_click.mp3" ></source>
    </audio>
  </div>
  )
}
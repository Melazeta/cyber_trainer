import React, { useLayoutEffect } from "react";
import { Graph } from "react-d3-graph";
import { playAudio } from "../utils";
import { backendPath, caseData } from "../auth";

import "../css/text.css";


export function RelationsheepGraph(props) {
  let posX = 20;
  let posY = 20;

  // Relationsheep graph configuration
  const config = {
    nodeHighlightBehavior: true,
    node: {
        color: "lightgreen",
        fontColor: "white",
        size: 1000,
        highlightStrokeColor: "blue",
        labelProperty: "full_name",
        labelPosition: "bottom"
      },
      link: {
        highlightColor: "lightblue",
      },
    };

  const buildNodes = (characters) => {
    if (!characters)
      return [];
   
    let nodes = [];
    for(var key in characters){
      if (characters.hasOwnProperty(key) && !characters[key].dummy) {
        nodes.push({
          id: key,
          full_name: characters[key].first_name + " " + characters[key].last_name,
          svg: backendPath("/media/" + characters[key].avatar),
          x: characters[key].graphX,
          y: characters[key].graphY
        })
      }
    }
        
    return nodes;
  }

  const nodes = buildNodes(props.characters);
  const links = props.edges;

  if (!links || nodes.length === 0)
    return (
      <div style={ { backgroundColor: "#303030" } } >
        <h3 className="text-light unselectable" >No relationsheep to display...</h3>
      </div>
    );

  return (
      <div style={ { width: "100%", backgroundImage: "url('/graph-background.gif')", backgroundSize: "100%" } } >
        <div style={ { width: "100%", backgroundColor: "rgba(0, 0, 12, 0.6)" } } >
          <h4 className="polaris text-light unselectable" >Connections graph</h4>
          <Graph
              id="relationsheep" // id is mandatory, if no id is defined rd3g will throw an error
              data={ { nodes: nodes, links: links, focusedNodeId: caseData().focussed_character } }
              config={ config }
              staticGraph={ true }
              onClickNode={ nodeID => { playAudio("softClick-track"); props.selectCharacter(nodeID) } }
          />
          <audio className="softClick-track" >
            <source src="/audio/soft_click.mp3" ></source>
          </audio>
        </div>
      </div>
  );
}
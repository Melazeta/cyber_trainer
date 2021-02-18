import React from "react";
import { Container, Carousel } from "react-bootstrap";

import "../css/text.css";


// Display the cases list
export function NewsCarousel(props) {

  return (
    <div>
      <Carousel style={ { width: "100%", height: "100%" }} >
        <Carousel.Item>
          <Container>
            <img
              src="/icons/defence.png"
              alt="First slide"
              width={ 140 }
              height={ 150 }
            /><br />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p className="ace" >Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Container>
        </Carousel.Item>
        
        <Carousel.Item>
          <Container>
            <img
              src="/icons/defence.png"
              alt="Second slide"
              width={ 140 }
              height={ 150 }
            />
            <Carousel.Caption>
                <h3>Second slide label</h3>
                <p className="ace" >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Container>
        </Carousel.Item>
        <Carousel.Item>
          <Container>
            <img
              src="/icons/defence.png"
              alt="Third slide"
              width={ 140 }
              height={ 150 }
            /><br />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p className="ace" >Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Container>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

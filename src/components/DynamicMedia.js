import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Hypatia from "../assets/hypatia.png";

function DynamicMedia({ videoSource }) {
  const [mediaType, setMediaType] = useState("image"); // initially an image

  useEffect(() => {
    if (videoSource !== null && videoSource !== undefined) {
      setMediaType("video");
    }
  }, [videoSource]);

  return (
    <Row className="hypatia-row">
      <Col className="d-flex justify-content-center align-items-center">
        <div className="fixed-top text-center py-3">
          <div>
            {mediaType === "image" && (
              <img src={Hypatia} alt="Hypatia" className="hypatia" />
            )}
            {mediaType === "video" && (
              <video src={videoSource} autoPlay className="hypatia" />
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default DynamicMedia;

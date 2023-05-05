import React, { useState, useEffect } from "react";
import Hypatia from "../assets/hypatia.png";

const DynamicMedia = ({ videoSource }) => {
  const [mediaType, setMediaType] = useState("image"); // initially an image

  useEffect(() => {
    if (videoSource !== null && videoSource !== undefined) {
      setMediaType("video");
    }
  }, [videoSource]);

  return (
    <div>
      {mediaType === "image" && (
        <img
          src={Hypatia}
          alt="Hypatia"
          style={{
            width: "26vh",
            borderRadius: "6px",
          }}
        />
      )}
      {mediaType === "video" && (
        <video
          src={videoSource}
          autoPlay
          style={{
            width: "26vh",
            borderRadius: "6px",
          }}
        />
      )}
    </div>
  );
};

export default DynamicMedia;

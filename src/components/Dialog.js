import React, { useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";

function Dialog({ texts }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog) {
      dialog.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [texts]);

  return (
    <Row className="dialog-container">
      <Col className="col-1 col-xl-3"></Col>
      <Col className="d-flex align-items-center col-10 col-xl-6 dialog">
        <div ref={dialogRef}>
          {texts.map((text, index) => {
            return (
              <div key={index} className="q-a">
                {/* question */}
                <div key={`${index}-${text[0]}`} className="question">
                  {text[0]}
                </div>
                {/* answer */}
                <div key={`${index}-${text[1]}`} className="answer">
                  {text[1]}
                </div>
              </div>
            );
          })}
        </div>
        <div id="loader" className="d-flex justify-content-center"></div>
      </Col>
    </Row>
  );
}

export default Dialog;

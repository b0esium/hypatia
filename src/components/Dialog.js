import React, { useEffect, useRef } from "react";

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
    <div ref={dialogRef}>
      {texts.map((text, index) => {
        return (
          <div key={index} style={{ marginBottom: "24px" }}>
            {/* question */}
            <div
              key={`${index}-${text[0]}`}
              style={{ color: "grey", marginBottom: "6px" }}
            >
              {text[0]}
            </div>
            {/* answer */}
            <div
              key={`${index}-${text[1]}`}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "6px",
              }}
            >
              {text[1]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dialog;

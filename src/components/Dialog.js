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
          <ul key={index}>
            <li key={`${index}-${text[0]}`}>{text[0]}</li>
            <li key={`${index}-${text[1]}`}>{text[1]}</li>
          </ul>
        );
      })}
    </div>
  );
}

export default Dialog;

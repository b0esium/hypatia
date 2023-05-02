function Dialog({ texts }) {
  return (
    <ul>
      {texts.map((text) => {
        return <li key={text}>{text}</li>;
      })}
    </ul>
  );
}

export default Dialog;

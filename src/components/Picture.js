import Hypatia from "../assets/hypatia.png";

function Picture() {
  return (
    <img
      src={Hypatia}
      alt="Hypatia"
      style={{
        width: "26vh",
        borderRadius: "6px",
      }}
    />
  );
}

export default Picture;

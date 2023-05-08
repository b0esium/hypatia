import { useState } from "react";
import { Container } from "react-bootstrap";
// components
import DynamicMedia from "./components/DynamicMedia";
import Dialog from "./components/Dialog";
import Input from "./components/Input";
// API calls
import Answer from "./answer";
import AnimationId from "./animationId";
import AnimationUrl from "./animationUrl";

const App = () => {
  const [texts, setTexts] = useState([]);
  const [animationUrl, setAnimationUrl] = useState(null);

  // promises for async calls

  function getAnswer(question) {
    return new Promise((resolve) => {
      Answer(question, resolve);
    });
  }

  function getAnimationId(answer) {
    return new Promise((resolve) => {
      AnimationId(answer, resolve);
    });
  }

  function getAnimationUrl(id) {
    return new Promise((resolve) => {
      AnimationUrl(id, resolve);
    });
  }

  // async calls to APIs

  let answer,
    animationId = undefined;

  // get openAI answer & d-id animation ID
  async function ask(question) {
    try {
      // openAI
      answer = await getAnswer(question);

      // d-id
      // check if answer is short enough to animate
      if (answer.length <= 120) {
        animationId = await getAnimationId(answer);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get animation video from its ID
  async function retrieveAnimation(animationId) {
    try {
      let newAnimationUrl = await getAnimationUrl(animationId);
      setAnimationUrl(newAnimationUrl);
    } catch (error) {
      console.log(error);
    }
  }

  async function main(question, spinner) {
    await ask(question);

    // wait for video to be generated
    if (answer.length <= 120) {
      setTimeout(async () => {
        await retrieveAnimation(animationId);
      }, 8000);
    }

    // end loading & show question and answer
    setTimeout(() => {
      spinner.remove();
      setTexts([...texts, [question, answer]]);
    }, 4000);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // loading...
    const loader = document.getElementById("loader");
    const spinner = document.createElement("div");
    spinner.classList.add("spinner-border", "loader");
    spinner.style.margin = "auto";
    loader.appendChild(spinner);

    const question = e.target.text.value;
    main(question, spinner);

    e.target.text.value = "";
  };

  return (
    <Container fluid className="page">
      <DynamicMedia videoSource={animationUrl}></DynamicMedia>

      <Dialog texts={texts}></Dialog>

      <Input handleSubmit={handleSubmit}></Input>
    </Container>
  );
};

export default App;

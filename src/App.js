import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import DynamicMedia from "./components/DynamicMedia";
import Dialog from "./components/Dialog";
import Answer from "./answer";
import AnimationId from "./animationId";
import AnimationUrl from "./animationUrl";

const App = () => {
  const [texts, setTexts] = useState([]);
  const [animationUrl, setAnimationUrl] = useState(null);

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

  let animationId,
    answer = undefined;

  async function main(question, spinner) {
    await ask(question);

    // wait for video to be generated
    if (answer.length <= 120) {
      setTimeout(async () => {
        await retrieve(animationId);
      }, 8000); // TODO: wait time proportional to answer length
    }

    // end loading & show question and answer
    setTimeout(() => {
      spinner.remove();
      setTexts([...texts, [question, answer]]);
    }, 4000);
  }

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

  async function retrieve(animationId) {
    try {
      let newAnimationUrl = await getAnimationUrl(animationId);
      setAnimationUrl(newAnimationUrl);
    } catch (error) {
      console.log(error);
    }
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
    <Container fluid style={{ height: "100vh" }}>
      <Row style={{ height: "30vh" }}>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="fixed-top text-center py-3">
            <DynamicMedia videoSource={animationUrl}></DynamicMedia>
          </div>
        </Col>
      </Row>

      <Row style={{ height: "60vh", overflowY: "scroll", paddingTop: "4vh" }}>
        <Col className="col-1 col-xl-3"></Col>
        <Col
          className="d-flex align-items-center col-10 col-xl-6"
          style={{ flexDirection: "column", padding: "0 24px" }}
        >
          <Dialog texts={texts}></Dialog>
          <div id="loader" className="d-flex justify-content-center"></div>
        </Col>
      </Row>

      <Row style={{ height: "10%", backgroundColor: "#f8f9fa" }}>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="fixed-bottom pb-4">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="d-flex px-5">
                <Form.Control
                  type="text"
                  placeholder="Enter your message"
                  className="mr-2"
                  name="text"
                  autoFocus
                />
                <Button type="submit" className="btn-success">
                  Send
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

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

  let animationId = undefined;

  async function main(question) {
    await ask(question);

    // wait for video to be generated
    setTimeout(async () => {
      await retrieve(animationId);
    }, 8000);
  }

  async function ask(question) {
    try {
      // openAI
      let answer = await getAnswer(question);
      setTexts([...texts, [question, answer]]);

      // d-id
      animationId = await getAnimationId(answer);
      console.log("animationId: ", animationId);
    } catch (error) {
      console.log(error);
    }
  }

  async function retrieve(animationId) {
    try {
      let newAnimationUrl = await getAnimationUrl(animationId);
      setAnimationUrl(newAnimationUrl);
      console.log("newAnimationUrl: ", newAnimationUrl);

      // replace image with animation video
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const question = e.target.text.value;
    main(question);

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
        <Col
          className="d-flex align-items-center"
          style={{ flexDirection: "column", padding: "0 24px" }}
        >
          <Dialog texts={texts}></Dialog>
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
                <Button type="submit">Send</Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;

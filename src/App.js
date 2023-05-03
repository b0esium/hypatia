import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Picture from "./components/Picture";
import Dialog from "./components/Dialog";

const App = () => {
  const [texts, setTexts] = useState([]);
  const [questionID, setQuestionID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = e.target.text.value;

    // obtain answer from API
    console.log("id: " + questionID);
    fetch("http://localhost:8000/responses/" + questionID)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const newAnswer = data.content;
        setTexts([...texts, [newQuestion, newAnswer]]);
        e.target.text.value = "";
      });

    setQuestionID(questionID + 1);
  };

  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row style={{ height: "30vh", backgroundColor: "#f8f9fa" }}>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="fixed-top text-center py-3">
            <Picture></Picture>
          </div>
        </Col>
      </Row>

      <Row style={{ height: "60vh", overflowY: "scroll", paddingTop: "2vh" }}>
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

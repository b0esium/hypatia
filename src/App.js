import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Picture from "./components/Picture";
import Dialog from "./components/Dialog";

const App = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
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
      <Row style={{ height: "60vh", overflowY: "scroll" }}>
        <Col className="d-flex justify-content-center align-items-center">
          {/* Your scrollable content here */}
          <div>
            {Array.from({ length: 50 }, (_, i) => (
              <div key={i} className="my-3">
                Scrollable content
                blablablablablablablablablablablablablablablablablablablablabla{" "}
                {i + 1}
              </div>
            ))}
          </div>
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

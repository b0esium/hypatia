import { Row, Col, Form, Button } from "react-bootstrap";

function Input({ handleSubmit }) {
  return (
    <Row className="input">
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
  );
}

export default Input;

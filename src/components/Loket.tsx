import { Col, Container, Row } from "react-bootstrap";
import next from "../assets/img/next.png";

interface loketProps {
  loketID: string;
  handleCLick: () => void;
  name: string;
  currentAntrian: string;
}

export const Loket = (props: loketProps) => {
  return (
    <>
      <Container className="custom-container3">
        <Container className="custom-container4">
          <Row>
            <Col>
              <p style={{ float: "left" }}>LOKET {props.loketID}</p>
            </Col>
            <Col>
              <Row>
                <Col>
                  <button
                    style={{ color: "white", float: "right" }}
                    className="btn btn-sm"
                    onClick={props.handleCLick}
                    name={props.name}
                  >
                    <img src={next} alt="next" width={20} />
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Container
          style={{
            backgroundColor: "white",
            color: "white",
          }}
        >
          <Row style={{ boxShadow: "1px solid black" }}>
            <Col xs={12}>
              <p style={{ color: "black" }}>{props.currentAntrian}</p>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

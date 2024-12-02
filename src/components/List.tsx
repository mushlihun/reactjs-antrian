import { Col, Container, Row } from "react-bootstrap";
import { Antrian } from "../App";

interface ListProps {
  type: string;
  data: Antrian[];
  loketID: string;
  currentAntrian: Antrian | null;
  handleClose: () => void;
  handleCentang: () => void;
}

export const List = (props: ListProps) => {
  const data = props.data;

  return (
    <>
      <Col xs={5}>
        <Container className="custom-container1">
          <Container className="custom-container2">
            <Row>
              <Col>
                <b style={{ float: "left" }}>TIKET {props.type}</b>
              </Col>
              <Col xs={3}>
                <Row>
                  <Col>
                    <a
                      style={{ color: "white" }}
                      className="btn btn-sm"
                      onClick={props.handleClose}
                    >
                      <h3>X</h3>
                    </a>

                    <a
                      style={{ color: "white" }}
                      className="btn btn-sm"
                      onClick={props.handleCentang}
                    >
                      <h3>✓</h3>
                    </a>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            {props.currentAntrian === null ? (
              <h3>ANTRIAN</h3>
            ) : (
              <>
                <Row>
                  <Col xs={4}>
                    <h1 style={{ color: "white", fontWeight: "bold" }}>
                      {props.currentAntrian?.noantrian}
                    </h1>
                  </Col>
                  <Col xs={8}>
                    <h2 style={{ color: "white" }}>
                      {props.currentAntrian?.noplate}
                    </h2>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p style={{ color: "white", fontWeight: "bold" }}>
                      MENUJU LOKET {props.loketID}
                    </p>
                  </Col>
                </Row>
              </>
            )}
          </Container>

          <Container
            style={{
              backgroundColor: "white",
              color: "white",
            }}
          >
            {data.map((item) => (
              <Row key={item.id} style={{ boxShadow: "1px solid black" }}>
                <Col xs={4}>
                  <h3 style={{ color: "black" }}>{item.noantrian}</h3>
                </Col>
                <Col xs={8}>
                  <h3 style={{ color: "black" }}>{item.noplate}</h3>
                </Col>
              </Row>
            ))}
          </Container>
        </Container>
      </Col>
    </>
  );
};

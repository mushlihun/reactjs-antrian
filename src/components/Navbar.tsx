// Navbar.js
import { format } from "date-fns/format";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

export const Navbar = () => {
  const date = new Date();
  const formatDate = "EEEE dd MMM, yyyy";
  const today = format(date, formatDate);

  const [timeNow, setTimeNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatedTime = timeNow.toLocaleTimeString();
  return (
    <div className="custom-navbar">
      <Row>
        <Col>
          <h5 style={{ color: "blue", fontWeight: "bold" }}>DUMMY LOGO</h5>
        </Col>
        <Col>
          <h5
            style={{
              color: "blue",
              paddingLeft: "120px",
              fontWeight: "bold",
            }}
          >
            QMS
          </h5>
        </Col>
        <Col>
          <Row style={{ float: "right" }}>
            <Col>
              <div>
                <h5 style={{ color: "blue", padding: "0", margin: "0" }}>
                  {formatedTime}
                </h5>
                <b style={{ color: "blue", padding: "0", margin: "0" }}>
                  {today}
                </b>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

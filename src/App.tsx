import "firebase/compat/firestore";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import db from "./Config";
import Form from "./components/Form";
import { List } from "./components/List";
import { Loket } from "./components/Loket";
import { Navbar } from "./components/Navbar";

import "./assets/css/App.css";

export interface Antrian {
  id: string;
  typeantrian: string;
  noantrian: string;
  noplate: string;
  created_at: Date;
}

function App() {
  const [bookingData, setBookingData] = useState<Antrian[]>([]);
  const [nonBookingData, setNonBookingData] = useState<Antrian[]>([]);
  const antrianCollections = collection(db, "antrian");

  const [currentAntrianBooking, setCurrentAntrianBooking] =
    useState<Antrian | null>(null);
  const [currentAntrianNonBooking, setCurrentAntrianNonBooking] =
    useState<Antrian | null>(null);
  const [loketIDBooking, setLoketIDBooking] = useState<string>("");
  const [loketIDNonBooking, setLoketIDNonBooking] = useState<string>("");

  const [currentAntrianLoketA, setCurrentAntrianLoketA] = useState<string>("");
  const [currentAntrianLoketB, setCurrentAntrianLoketB] = useState<string>("");
  const [currentAntrianLoketC, setCurrentAntrianLoketC] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const snapshot = await getDocs(antrianCollections);
      const datalist: Antrian[] = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Antrian)
      );

      datalist.sort((a, b) => {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      });

      const bookingList = datalist.filter(
        (item) => item.typeantrian === "booking"
      );
      const nonBookingList = datalist.filter(
        (item) => item.typeantrian === "non-booking"
      );

      setBookingData(bookingList);
      setNonBookingData(nonBookingList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNext = (loketID: string, name: string) => {
    if (loketID === "A") {
      setCurrentAntrianNonBooking(nonBookingData[0] || null);
      setNonBookingData(nonBookingData.slice(1));
      setLoketIDNonBooking(name);
    } else if (loketID === "B") {
      setCurrentAntrianBooking(bookingData[0] || null);
      setBookingData(bookingData.slice(1));
      setLoketIDBooking(name);
    } else if (loketID === "C") {
      const nextBooking = bookingData[0];
      const nextNonBooking = nonBookingData.find(
        (antrian) => antrian.typeantrian === "non-booking"
      );
      if (nextBooking) {
        setCurrentAntrianBooking(nextBooking);
        setBookingData(bookingData.slice(1));
        setLoketIDBooking(name);
      } else if (nextNonBooking) {
        setCurrentAntrianNonBooking(nextNonBooking);
        setNonBookingData(
          nonBookingData.filter((antrian) => antrian !== nextNonBooking)
        );
        setLoketIDNonBooking(name);
      }
    }
  };

  const handleCloseBooking = async () => {
    await deleteDoc(doc(db, "antrian", currentAntrianBooking?.id || ""));
    setCurrentAntrianBooking(null);
    setLoketIDBooking("");
  };
  const handleCloseNonBooking = async () => {
    await deleteDoc(doc(db, "antrian", currentAntrianNonBooking?.id || ""));
    setCurrentAntrianNonBooking(null);
    setLoketIDNonBooking("");
  };

  const handleCentangBooking = () => {
    const nomorplat = currentAntrianBooking?.noplate || "";
    if (loketIDBooking === "C") {
      setCurrentAntrianLoketC(nomorplat);
      setCurrentAntrianBooking(null);
      setLoketIDBooking("");
    } else {
      setCurrentAntrianLoketB(nomorplat);
      setCurrentAntrianBooking(null);
      setLoketIDBooking("");
    }
  };
  const handleCentangNonBooking = () => {
    const nomorplat = currentAntrianNonBooking?.noplate || "";
    if (loketIDNonBooking === "C") {
      setCurrentAntrianLoketC(nomorplat);
      setCurrentAntrianNonBooking(null);
      setLoketIDNonBooking("");
    } else {
      setCurrentAntrianLoketA(nomorplat);
      setCurrentAntrianNonBooking(null);
      setLoketIDNonBooking("");
    }
  };

  return (
    <div>
      <Navbar />
      <div className=" custom-layout text-center">
        <Form />
        <div className="spasi"></div>
        <Row>
          <List
            handleClose={handleCloseBooking}
            handleCentang={handleCentangBooking}
            type="BOOKING"
            data={bookingData}
            currentAntrian={currentAntrianBooking}
            loketID={loketIDBooking}
          />
          <List
            handleCentang={handleCentangNonBooking}
            handleClose={handleCloseNonBooking}
            type="NON BOOKING"
            data={nonBookingData}
            currentAntrian={currentAntrianNonBooking}
            loketID={loketIDNonBooking}
          />
          <Col xs={2}>
            <Loket
              loketID="A"
              handleCLick={() => handleNext("A", "A")}
              name="loket A"
              currentAntrian={currentAntrianLoketA}
            />
            <Loket
              loketID="B"
              handleCLick={() => handleNext("B", "B")}
              name="loket B"
              currentAntrian={currentAntrianLoketB}
            />
            <Loket
              loketID="C"
              handleCLick={() => handleNext("C", "C")}
              name="loket C"
              currentAntrian={currentAntrianLoketC}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;

import { addDoc, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import db from "../Config";

const Form: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [typeAntrian, setTypeAntrian] = useState<string>("");
  const [noPlate, setNoPlate] = useState<string>("");
  const [bookingCounter, setBookingCounter] = useState<number>(1);
  const [nonBookingCounter, setNonBookingCounter] = useState<number>(1);
  const antrianCollections = collection(db, "antrian");

  useEffect(() => {
    const fetchLastAntrianNo = async () => {
      if (typeAntrian === "booking") {
        const q = query(antrianCollections, orderBy("noantrian", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const lastAntrian = querySnapshot.docs[0].data();
          if (lastAntrian.typeantrian === "booking") {
            setBookingCounter(parseInt(lastAntrian.noantrian.substring(1)) + 1);
          } else {
            setBookingCounter(1);
          }
        }
      } else if (typeAntrian === "non-booking") {
        const q = query(antrianCollections, orderBy("noantrian", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const lastAntrian = querySnapshot.docs[0].data();
          if (lastAntrian.typeantrian === "non-booking") {
            setNonBookingCounter(parseInt(lastAntrian.noantrian.substring(1)) + 1);
          } else {
            setNonBookingCounter(1);
          }
        }
      }
    };

    fetchLastAntrianNo();
  }, [typeAntrian]);

  const handleSubmit = async () => {
    try {
      const antrianType = typeAntrian === "booking" ? "B" : "A";
      const antrianNo = typeAntrian === "booking" ? bookingCounter : nonBookingCounter;
      
      await addDoc(antrianCollections, {
        typeantrian: typeAntrian,
        noantrian: `${antrianType}${antrianNo}`,
        noplate: noPlate,
        created_at: new Date(),
      });

      if (typeAntrian === "booking") {
        setBookingCounter(bookingCounter + 1);
      } else {
        setNonBookingCounter(nonBookingCounter + 1);
      }

      onCloseModal();
      alert("Data Berhasil ditambahkan");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Data Gagal ditambahkan");
    }
  };

  const onCloseModal = () => {
    setOpenModal(false);
    setTypeAntrian("");
    setNoPlate("");
  };

  const handleTypeAntrianChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeAntrian(e.target.value);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add Antrian</Button>
      <Modal show={openModal} onHide={onCloseModal} popup>
        <Modal.Header closeButton>
          <Modal.Title>Tambah Data Antrian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="noantrian">No Antrian:</label>
          <input
            type="text"
            id="noantrian"
            className="input-group"
            value={typeAntrian === "booking" ? `B${bookingCounter}` : `A${nonBookingCounter}`}
            readOnly // noAntrian diisi otomatis
          />
          <br />
          <label htmlFor="noplate">No Plat:</label>
          <input
            type="text"
            className="input-group"
            id="noplate"
            value={noPlate}
            onChange={(e) => setNoPlate(e.target.value)}
          />
          <br />
          <label htmlFor="typeantrian">Tipe Antrian:</label>
          <select
            id="typeantrian"
            value={typeAntrian}
            className="input-group"
            onChange={handleTypeAntrianChange}
          >
            <option value="">Pilih Tipe Antrian</option>
            <option value="booking">Booking</option>
            <option value="non-booking">Non-Booking</option>
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Form;

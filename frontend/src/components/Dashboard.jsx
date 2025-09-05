import { useState } from "react";
import Checkboxes from "./Checkboxes";
import Modal from "./Modal";
import Navbar from "./Navbar";
import imagen from "../assets/konatapat.png";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {}
      <Navbar />

      <div style={{ padding: "100px 20px 20px" }}>
        {}
        <h1>Control de EPP+</h1>

        <Checkboxes />

        <button
          onClick={() => setShowModal(true)}
          style={{ marginTop: "20px", padding: "10px" }}
        >
          ?
        </button>

        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          image={imagen}
        />
      </div>
    </>
  );
}

export default Dashboard;

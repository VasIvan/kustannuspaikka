import React from 'react';
import { Modal } from 'react-bootstrap';
import AddForm from './AddForm';

function ModalOpen(props) {
  const { modalData, show, handleClose } = props;
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#687178', fontWeight: 'bold' }}>
            {modalData ? <h3>MUOKKAA/POISTA</h3> : <h3>LISÄÄ</h3>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddForm modalData={modalData} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalOpen;

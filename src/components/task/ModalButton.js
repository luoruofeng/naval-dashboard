// components/BootstrapModal.js

import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from './ModalButton.module.css';

const BootstrapModal = ({ buttonText, modalTitle, modalText }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow} className={styles['modal-button']}>
        {buttonText}
      </Button>

      <Modal className={styles['modal-dialog']} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles['modal-content']}>
          {modalText}
        </Modal.Body>
        <Modal.Footer className={styles['modal-close']}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BootstrapModal;

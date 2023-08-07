// components/BootstrapModal.js

import React from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import styles from './ModalButton.module.css';
import { fetchData } from '../../libs/api';

const BootstrapModal = ({ buttonText, modalTitle, modalText, url}) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(modalText);
  
  const fetchResultData = async (id) => {
    const result = await fetchData(url,"GET");
    return result;
  };

  const handleShow = async () => {
    if (url == undefined && modalText != undefined) {
      setShow(true); // Show the modal
      return;
    }

    const data = await fetchResultData(modalTitle); // Fetch data from the specified URL
    console.info("data: ", data)
    modalText = JSON.stringify(data); // Set modal text with fetched data
    setContent(modalText); // Set modal text with fetched data
    setShow(true); // Show the modal
  };
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
          {content}
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

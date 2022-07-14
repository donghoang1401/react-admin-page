import { Modal } from "react-bootstrap";

export const FormModal = ({ title, show, handleClose, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header onClick={handleClose} closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">{children}</Modal.Body>
    </Modal>
  );
};

import { Button, Modal } from "react-bootstrap";

export const ConfirmDialog = ({ isShow, setShow, title, ...rest }) => {
  const { handleCloseConfirmDialog, handleDelete, ...props } = rest;

  return (
    <Modal
      size="sm"
      show={isShow}
      onHide={() => setShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
      centered
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseConfirmDialog}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

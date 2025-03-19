import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IModalProps {
  show: boolean
  title: string
  text: string
  onSave: () => void,
  onClose: () => void
}

export const ConfirmationModal = ({ show, title, text, onSave, onClose }: IModalProps) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{text}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="danger" onClick={onSave}>Delete, Anyway</Button>
      </Modal.Footer>
    </Modal>
  );
}
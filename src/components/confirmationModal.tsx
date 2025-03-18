import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Ensure accessibility

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
  console.log(isOpen)
  return (
    <Modal isOpen={true} onRequestClose={onClose} className="modal" overlayClassName="modal-overlay">
      <div className="p-4 bg-white rounded-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <p>Do you really want to delete this player? This action cannot be undone.</p>
        <div className="flex justify-end gap-2 mt-4">
          <button className="px-4 py-2 bg-gray-400 text-white rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

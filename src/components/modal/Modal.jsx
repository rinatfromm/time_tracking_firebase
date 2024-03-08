import React from "react";

const Modal = ({ isOpen, onClose, onSave, newTime, setNewTime }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Time</h2>
        <div>
          <label>New Time:</label>
          <input
            type="number"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </div>
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
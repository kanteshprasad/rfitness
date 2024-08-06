// EditMemberModal.js
'use client';

import React from 'react';
import { Modal, Button } from 'react-bootstrap';




const EditMemberModal = ({ show, onClose, member, onSave }) => {
  const [selectedMember, setSelectedMember] = React.useState(member);

  React.useEffect(() => {
    setSelectedMember(member);
  }, [member]);

  const handleSave = () => {
    onSave(selectedMember);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedMember && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={selectedMember.name}
              onChange={(e) => setSelectedMember({ ...selectedMember, name: e.target.value })}
              className="form-control mb-2"
            />
            <label>Months:</label>
            <input
              type="number"
              value={selectedMember.months}
              onChange={(e) => setSelectedMember({ ...selectedMember, months: parseInt(e.target.value, 10) })}
              className="form-control mb-2"
            />
            <label>Date of Joining (DOJ):</label>
            <input
              type="date"
              value={selectedMember.doj.split('T')[0]} // Format for date input
              onChange={(e) => setSelectedMember({ ...selectedMember, doj: e.target.value })}
              className="form-control mb-2"
            />
            <label>Payment:</label>
            <input
              type="text"
              value={selectedMember.payment}
              onChange={(e) => setSelectedMember({ ...selectedMember, payment: e.target.value })}
              className="form-control mb-2"
            />
            <label>Date of Birth (DOB):</label>
            <input
              type="date"
              value={selectedMember.dob.split('T')[0]} // Format for date input
              onChange={(e) => setSelectedMember({ ...selectedMember, dob: e.target.value })}
              className="form-control mb-2"
            />
            <label>Goal:</label>
            <input
              type="text"
              value={selectedMember.goal}
              onChange={(e) => setSelectedMember({ ...selectedMember, goal: e.target.value })}
              className="form-control mb-2"
            />
            <label>Email:</label>
            <input
              type="email"
              value={selectedMember.email}
              onChange={(e) => setSelectedMember({ ...selectedMember, email: e.target.value })}
              className="form-control mb-2"
            />
            <label>Phone:</label>
            <input
              type="text"
              value={selectedMember.phone}
              onChange={(e) => setSelectedMember({ ...selectedMember, phone: e.target.value })}
              className="form-control mb-2"
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditMemberModal;

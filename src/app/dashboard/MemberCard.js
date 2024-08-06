import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';





const CardComponent = ({ member, onEdit, onDelete }) => {
    return (
      <Card className='card'>
        <div className='pname'>
          <Card.Title style={{fontWeight: "1000",}}>{member.name}</Card.Title>
        </div>
        <div className='card-body'>
          <div className='profile-picture-container'>
            <div
              className='profile-picture'
              style={{
                backgroundImage: member.picture
                  ? `url(${member.picture})`
                  : "none",
                backgroundColor: member.picture ? "transparent" : "red",
              }}></div>
          </div>
          <div className='details-container'>
            <Card.Body>
              <Card.Text>
                <strong>Email:</strong> {member.email} <br />
                <strong>Phone:</strong> {member.phone} <br />
                <strong>Date of Joining:</strong>{" "}
                {new Date(member.doj).toLocaleDateString()} <br />
                <strong>Date of Birth:</strong>{" "}
                {new Date(member.dob).toLocaleDateString()} <br />
                <strong>Payment:</strong> {member.payment} <br />
                <strong>Goal:</strong> {member.goal} <br />
                <strong>Months:</strong> {member.months} <br />
                <strong>Date of Expiry:</strong>{" "}
                {new Date(member.doe).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </div>
        </div>
        <div className='buttons-container'>
          <Button variant='warning' onClick={() => onEdit(member)}>
            <FaEdit /> Edit
          </Button>
          <Button
            variant='danger'
            onClick={() => onDelete(member)}
            className='ms-2'>
            <FaTrash /> Delete
          </Button>
        </div>
      </Card>
    );
};

export default CardComponent;

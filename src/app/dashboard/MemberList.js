// MemberList.js
'use client';

import React, { useState, useEffect } from 'react';
import { Client, Databases } from 'appwrite';
import { Button, Toast } from 'react-bootstrap';
import MemberCard from './MemberCard';
import EditMemberModal from './EditMemberModal';




const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID;
const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId); // Your project ID

const databases = new Databases(client);

const fetchMembers = async () => {
  try {
    const response = await databases.listDocuments(
      databaseId, // Your database ID
      collectionId  // Your collection ID
    );
    return response.documents;
  } catch (err) {
    console.error('Failed to fetch members', err);
    return [];
  }
};

const deleteMember = async (memberId) => {
  try {
    await databases.deleteDocument(
      databaseId, // Your database ID
      collectionId, // Your collection ID
      memberId
    );
    return true;
  } catch (err) {
    console.error('Failed to delete member', err);
    return false;
  }
};

const updateMember = async (memberId, updatedData) => {
  try {
    // Ensure that no unwanted fields are included
    const { $databaseId, $collectionId, ...dataToUpdate } = updatedData;

    await databases.updateDocument(
      databaseId, // Your database ID
      collectionId, // Your collection ID
      memberId,
      dataToUpdate // Only include fields that need to be updated
    );

    return true;
  } catch (err) {
    console.error('Failed to update member', err);
    return false;
  }
};

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadMembers = async () => {
      const data = await fetchMembers();
      setMembers(data);
    };
    loadMembers();
  }, []);

  const handleEdit = (member) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const handleDelete = async (member) => {
    const success = await deleteMember(member.$id);
    if (success) {
      setMembers(members.filter((m) => m.$id !== member.$id));
      setToastMessage('Member deleted successfully');
      setShowToast(true);
    } else {
      setToastMessage('Failed to delete member');
      setShowToast(true);
    }
  };

  const handleSave = async (updatedMember) => {
    const success = await updateMember(updatedMember.$id, updatedMember);
    if (success) {
      setMembers(members.map((m) => (m.$id === updatedMember.$id ? updatedMember : m)));
      setShowEditModal(false);
      setToastMessage('Member updated successfully');
      setShowToast(true);
    } else {
      setToastMessage('Failed to update member');
      setShowToast(true);
    }
  };

  return (
    <>
    <div style={{display:"flex", justifyContent:"center" , backdropFilter:"blur(25px)" , alignItems:"center"}} > <h3 style={{color:"yellow"}}>Total Number of Members {members.length}</h3> </div>
      <div className="row">
        {members.map((member) => (
          <MemberCard
            key={member.$id}
            member={member}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <EditMemberModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        member={selectedMember}
        onSave={handleSave}
      />
      {showToast && (
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </>
  );
};

export default MemberList;

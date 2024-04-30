import React, { useState } from 'react';
import axios from 'axios';

const DeleteProperty = () => {
  const [propertyID, setPropertyID] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteProperty = async () => {
    try {
      await axios.delete(`http://localhost:3001/deleteProperty/${propertyID}`);
      setPropertyID('');
      setConfirmDelete(false);
      alert('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <h2>Delete Property</h2>
      <input type="text" value={propertyID} onChange={(e) => setPropertyID(e.target.value)} placeholder="Enter Property ID" />
      <button onClick={() => setConfirmDelete(true)}>Delete Property</button>
      {confirmDelete && (
        <div className="popup">
          <div className="popup-content">
            <p>Are you sure you want to delete this property?</p>
            <button onClick={handleDeleteProperty}>Yes</button>
            <button onClick={() => setConfirmDelete(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteProperty;

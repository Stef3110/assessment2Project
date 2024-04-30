import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PropertyList = () => {

  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);



  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:3001/unconfirmedProperties');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleConfirmProperty = async (propertyID) => {
    try {
      await axios.put(`http://localhost:3001/confirmProperty/${propertyID}`);
      setProperties(properties.filter(property => property.propertyID !== propertyID));
    } catch (error) {
      console.error('Error confirming property:', error);
    }
  };

  const handlePopupYes = () => {
    if (selectedProperty) {
      handleConfirmProperty(selectedProperty.propertyID);
      setSelectedProperty(null);
    }
  };

  const handleCardClick = (property) => {
    setSelectedProperty(property);
  };

  return (
    <div style={{ paddingTop: '100px' }}>
    {selectedProperty && (
      <div className="modal fade show" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Property</h5>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to confirm this property?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setSelectedProperty(null)}>No</button>
              <button type="button" className="btn btn-primary" onClick={handlePopupYes}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    )}
    <div className="property-list">
      {properties.map(property => (
        <div key={property.propertyID} className="property-card" onClick={() => handleCardClick(property)}>
          <h3>{property.address}</h3>
          <p>Description: {property.description}</p>
          <p>Price: {property.price}</p>
          <p>Rent Price: {property.rentPrice}</p>
          <p>User Mobile: {property.mobile}</p>
          <p>User Owner: {property.username}</p>
          <p>User ID: {property.userID}</p>
          <button className="btn btn-primary" onClick={() => setSelectedProperty(property)}>Confirm Property</button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default PropertyList;

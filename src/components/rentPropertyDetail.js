import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const PropertyDetail = () => {
  const { propertyID } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [userUsername, setUserUsername] = useState('');
  const [userMobile, setUserMobile] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3001/properties/${propertyID}`)
      .then(response => {
        setProperty(response.data);
        fetchUserMobile(response.data.userID);
      })
      .catch(error => {
        console.error('Error fetching property details:', error);
      });
    
    axios.get(`http://localhost:3001/images/${propertyID}`)
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching property images:', error);
      });
  }, [propertyID]);

  const fetchUserMobile = (userID) => {
    axios.get(`http://localhost:3001/users/${userID}`)
      .then(response => {
        setUserMobile(response.data.mobile);
        setUserUsername(response.data.username)
      })
      .catch(error => {
        console.error('Error fetching user mobile:', error);
      });
  };

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            {property ? (
              <div>
                <h2>Buy Property Details</h2>
                <p>Address: {property.address}</p>
                <p>Description: {property.description}</p>
                <p>Price: {property.rentPrice}</p>
                <p>Floor: {property.floor}</p>
                <p>Owner's Name: {userUsername}</p>
                <p>Owner's Mobile: {userMobile}</p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="col-lg-6">
            <div style={{ width: '400px', height: '400px' }}>
              {property && (
                <MapContainer center={[property.lat, property.lon]} zoom={13} style={{ height: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[property.lat, property.lon]}>
                    <Popup>{property.address}</Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {images.length > 0 && (
              <div style={{ position: 'relative', maxWidth: '100%', overflow: 'hidden', margin: '0 auto' }}>
                <img
                  src={`/uploads/${images[activeIndex].filename}`}
                  alt={`Image ${activeIndex}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
                <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                <button className="btn btn-primary" onClick={handlePrev}>Previous</button>
                <button className="btn btn-primary ml-2" onClick={handleNext}>Next</button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;

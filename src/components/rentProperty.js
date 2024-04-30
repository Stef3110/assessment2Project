import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const RentProperty = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState('price');

  useEffect(() => {
    axios.get(`http://localhost:3001/allrentproperties?sortBy=${sortBy}`)
      .then(response => {
        setProperties(response.data);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, [sortBy]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSeeMore = (propertyID) => {
    navigate(`/rentProperty/${propertyID}`);
  }

  

  return (
    <div style={{ paddingTop: '100px' }}>
      <MapContainer center={[37.9685, 23.7283]} zoom={10} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {properties.map(property => (
          <Marker key={property.propertyID} position={[property.lat, property.lon]}>
            <Popup>
              <div>
                <img src={`/uploads/${property.image}`} alt="Property" style={{ maxWidth: '100px' }} />
                <p>Address: {property.address}</p>
                <p>Rent Price: {property.rentPrice}</p>
                <button onClick={() => handleSeeMore(property.propertyID)}>See more</button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div style={{ marginBottom: '20px' }}>
        <h2>Rent Property List</h2>
        <label>Sort By: </label>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="rentPrice">Lowest Rent Price</option>
          <option value="rentPriceDesc">Highest Rent Price</option>
        </select>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {properties.map(property => (
          <div key={property.propertyID} className="col-md-4 mb-4" style={{ flexBasis: 'calc(33.33% - 20px)', margin: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
            <Link to={`/rentProperty/${property.propertyID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card">
                <div className="card-body">
                <img src={`/uploads/${property.image}`} alt="Property" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <h5 className="card-title">{property.address}</h5>
                  <p className="card-text">Rent Price: {property.rentPrice}</p>
                  <p className="card-text">Floor: {property.floor}</p>

                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

  
  export default RentProperty;

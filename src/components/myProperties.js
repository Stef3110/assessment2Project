import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyProperties = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await axios.get('http://localhost:3001/isLoggedIn');
                if (response.status !== 200) {
                    navigate("/login")
                } else {
                    console.log("User is logged in");
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                navigate('/login');
            }
        };

        checkLogin();
    }, [navigate]);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:3001/myProperties');
            setProperties(response.data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    

    const handleHideProperty = async (propertyID) => {
        try {
            await axios.put(`http://localhost:3001/hideProperty/${propertyID}`);
            fetchProperties(); // Refresh properties after hiding
        } catch (error) {
            console.error('Error hiding property:', error);
        }
    };

    const handleShowProperty = async (propertyID) => {
        try {
            await axios.put(`http://localhost:3001/showProperty/${propertyID}`);
            fetchProperties(); // Refresh properties after showing
        } catch (error) {
            console.error('Error showing property:', error);
        }
    };



    return (
        <div className="container mt-5">
            <h1 className="mb-4">My Properties</h1>
            <div className="row">
                {properties.map(property => (
                    <div key={property.propertyID} className="col-lg-4 mb-4">
                        <div className="card">
                            <img src={`/uploads/${property.image}`} className="card-img-top" alt="Property" />
                            <div className="card-body">
                                <h5 className="card-title">Address: {property.address}</h5>
                                <p className="card-text">
                                    {property.confirmed === 0 ? 'Property: Unverified' : property.confirmed === 1 ? 'Property: On' : 'Property: Hidden'}
                                </p>
                                {property.confirmed !== 0  && (
                                    <div>
                                        <button className="btn btn-primary mr-2" onClick={() => handleShowProperty(property.propertyID)}>Show</button>
                                        <button className="btn btn-warning mr-2" onClick={() => handleHideProperty(property.propertyID)}>Hide</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProperties;

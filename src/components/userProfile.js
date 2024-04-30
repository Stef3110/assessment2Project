import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getUserDetails');
                console.log("Status:", response.status);
                if (response.status !== 200) {
                    navigate("/login");
                } else {
                    setUser(response.data);
                    console.log("User data:", response.data);
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                navigate('/login');
            }
        };
    
        fetchData();
    }, []);
    

    const handleLogout = () => {
        axios.get('http://localhost:3001/logout')
            .then(response => {
                navigate("/login");
            })
            .catch(error => {
                console.error('Error logging out:', error);
            });
    };

    const handleMyInformation = () => {
        navigate("/myInfo");
    };

    const handleSellProperty = () => {
        navigate("/sellProperty");
    };
    const handleMyProperties = () => {
        navigate("/myProperties");
    };

    return (
        <div className="container mt-5" style={{ paddingTop: '100px', maxWidth: '400px' }}>
            <h1 className="mb-4">User Profile</h1>
            <button className="btn btn-primary mb-2" onClick={handleMyInformation}>My Information</button>
            <button className="btn btn-success mb-2" onClick={handleSellProperty}>Sell Property</button>
            <button className="btn btn-success mb-2" onClick={handleMyProperties}>My Properties</button>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;

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
    


    const handleBack = () => {
        navigate("/userProfile");
    };


    return (
        <div className="container mt-5" style={{ paddingTop: '100px' }}>
            <h1 className="mb-4">User Profile</h1>
            <div>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Mobile:</strong> {user.mobile}</p>
            </div>
            <button className="btn btn-primary mr-2" onClick={handleBack}>Back</button>
        </div>
    );
};

export default Profile;

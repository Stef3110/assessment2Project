import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        address: '',
        lon: '',
        lat: '',
        description: '',
        floor: '',
        price: '',
        rentPrice: '',
        profilePicture: null,
        images: []
    }); 
    
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'images') {
            setFormData({
                ...formData,
                images: [...formData.images, ...e.target.files] 
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.files[0] 
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataWithPictures = new FormData(); 
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'images') {
                    value.forEach(image => {
                        formDataWithPictures.append('images', image);
                    });
                } else {
                    formDataWithPictures.append(key, value);
                }
            });
            const response = await axios.post('http://localhost:3001/addproperty', formDataWithPictures);
            console.log('Property added:', response.data);
            setFormData({
                address: '',
                lon: '',
                lat: '',
                description: '',
                floor: '',
                price: '',
                rentPrice: '',
                profilePicture: null,
                images: []
            });
            navigate('/userProfile'); // Redirect to the user profile page
        } catch (error) {
            console.error('error adding property', error);
        }
    };

    const handleMapClick = (e) => {
        setFormData({
            ...formData,
            lon: e.latlng.lng,
            lat: e.latlng.lat
        });
    };

    const handleAddMarker = async () => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${formData.address}&format=json`);
            const data = await response.json();
            
            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setFormData({
                    ...formData,
                    lon: lon,
                    lat: lat
                });
            } else {
                console.error('address not found');
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    const FocusMarker = () => {
        const map = useMap();
        if (formData.lon && formData.lat) {
            map.setView([formData.lat, formData.lon], 17);
        }
        return null;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="address" id="address" value={formData.address} onChange={handleInputChange} placeholder="Enter address" />
                                <button type="button" className="btn btn-secondary" onClick={handleAddMarker}>Add Marker</button>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" name="description" id="description" value={formData.description} onChange={handleInputChange} placeholder="Enter description" rows="4"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="floor" className="form-label">Type of property</label>
                            <input type="text" className="form-control" name="floor" id="floor" value={formData.floor} onChange={handleInputChange} placeholder="Enter type of property (Apartment, Studio)" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price *Leave empty if not for sale*</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="price" id="price" value={formData.price} onChange={handleInputChange} placeholder="Enter price" />
                                <span className="input-group-text">$</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rentPrice" className="form-label">Rent Price *Leave empty if not for rent*</label>
                            <div className="input-group">
                                <input type="text" className="form-control" name="rentPrice" id="rentPrice" value={formData.rentPrice} onChange={handleInputChange} placeholder="Enter rent price" />
                                <span className="input-group-text">$</span>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profilePicture" className="form-label">Property Profile Picture</label>
                            <input type="file" className="form-control" name="profilePicture" id="profilePicture" onChange={handleFileChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="images" className="form-label">Images</label>
                            <input type="file" className="form-control" name="images" id="images" multiple onChange={handleFileChange} />
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Add Property</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <MapContainer center={[37.9755648, 23.7348324]} zoom={13} style={{ height: '400px', width: '100%' }} onClick={handleMapClick}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {formData.lon && formData.lat && <Marker position={[formData.lat, formData.lon]}>
                            <Popup>{formData.address}</Popup>
                        </Marker>}
                        <FocusMarker />
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;

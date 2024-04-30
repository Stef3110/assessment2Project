import React, { useState } from "react";
import './index.css';
import './style.css';
import './globals.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [showPropertiesDropdown, setShowPropertiesDropdown] = useState(false);

    const handleProfileClick = () => {
        navigate('/userProfile');
    };

    const togglePropertiesDropdown = () => {
        setShowPropertiesDropdown(!showPropertiesDropdown);
    };

    return (
        <div className="home">
            <div className="div">
                <img className="homehiveblak" src="/imgnavbar/homehiveblak-1.png" alt="HomeHive Logo" />
                <a href="../../../home" className="home-wrapper"><div className="text-wrapper">HOME</div></a>
                <div className="properties" onClick={togglePropertiesDropdown}>
                    <div className="text-wrapper-2">PROPERTIES</div>
                    {showPropertiesDropdown && (
                        <div className="dropdown-content">
                            <a href="../../../buyProperty">Buy Property</a>
                            <a href="../../../rentProperty">Rent Property</a>
                        </div>
                    )}
                </div>
                <a href="#" className="login" onClick={handleProfileClick}><img src="/imgnavbar/login.svg" alt="Login" /></a>
                <a href="../../../about" className="about-us"><div className="text-wrapper">ABOUT US</div></a>
                <img className="line" src="/imgnavbar/line-1.svg" alt="Decorative Line" />
            </div>
        </div>
    );
};

export default Navbar;
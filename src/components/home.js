import React from 'react';
import './home.css';
import './globals.css';

const HomeContent = () => {
    return (
        <div>
            <div className="group">
                <div className="text-wrapper-4">FIND US</div>
                <div className="text-wrapper-5">CONTACT US</div>
                <div className="group-2">
                    <div className="text-wrapper-6">+30 1234 5678</div>
                    <img className="img-2" src="imgnavbar/ph-phone-thin.svg" alt="Phone" />
                </div>
                <div className="group-3">
                    <div className="text-wrapper-7">homehive@gmail.com</div>
                    <img className="material-symbols" src="imgnavbar/material-symbols-light-mail-outline.svg" alt="Email" />
                </div>
                <div className="group-4">
                    <div className="text-wrapper-6">Grigoriou Kousidi 89</div>
                    <img className="img-2" src="imgnavbar/ph-address-book-thin.svg" alt="Address" />
                </div>
                <div className="group-5">
                    <div className="text-wrapper-6">15527 Zografou</div>
                    <img className="img-2" src="imgnavbar/arcticons-map.svg" alt="Location" />
                </div>
                <div className="group-6">
                    <div className="text-wrapper-8">Message</div>
                    <div className="rectangle"></div>
                    <div className="rectangle-2"></div>
                    <div className="text-wrapper-9">Name</div>
                    <div className="rectangle-3"></div>
                    <div className="text-wrapper-10">Email</div>
                </div>
                <a href="#" className="frame-wrapper">
                    <div className="div-wrapper"><div className="text-wrapper-3">SEND</div></div>
                </a>
            </div>
            <div className="rectangle-4"></div>
            <img className="line-2" src="imgnavbar/line-2.svg" alt="Line" />
            <img className="line-3" src="imgnavbar/line-3.svg" alt="Line" />
            <div className="overlap">
                <a href="../../../buyProperty" className="frame-2"><div className="text-wrapper-3">BUY NOW</div></a>
                <p className="welcome-to-homehive">
                Welcome to HomeHive, your premier destination for finding the perfect place to call home or invest in valuable real estate. 
                Whether you're in the market for a cozy apartment, a spacious house, or a plot of land to build your dreams, our extensive
                 listings cover all bases. With options available for both sale and rent, we cater to every need and budget. 
                 Our user-friendly platform makes it easy to navigate through choices, compare different properties, and make
                  informed decisions. Start your real estate journey with us today and discover where comfort meets convenience.
                   Explore, envision, and establish your future with HomeHive.
                </p>
            </div>
            <div className="overlap-2">
                <a href="../../../rentProperty" className="frame-3"><div className="text-wrapper-3">RENT NOW</div></a>
                <p className="p">
                Welcome to HomeHive, your premier destination for finding the perfect place to call home or invest 
                in valuable real estate. Whether you're in the market for a cozy apartment, a spacious house, 
                or a plot of land to build your dreams, our extensive listings cover all bases. With options available
                 for both sale and rent, we cater to every need and budget. Our user-friendly platform makes it
                  easy to navigate through choices, compare different properties, and make informed decisions.
                   Start your real estate journey with us today and discover where comfort meets convenience.
                    Explore, envision, and establish your future with HomeHive.
                </p>
            </div>
            <img className="image" src="imgnavbar/image-1.png" alt="Home Image" />
            <img className="image-2" src="imgnavbar/image-2.png" alt="Home Image" />
        </div>
    );
};

export default HomeContent;

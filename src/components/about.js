import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const AboutUs = () => {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">About Us</h1>
            <div className="row">
                <div className="col-md-6">
                    <img src="/imgnavbar/homehiveblak-2.png" alt="About Us" className="img-fluid rounded"/>
                </div>
                <div className="col-md-6 d-flex align-items-center">
                    <div>
                        <h2>Welcome to HomeHive</h2>
                        <p>
                            HomeHive is your premier destination for finding the perfect place to call home or to invest in
                             valuable real estate. We pride ourselves on our deep commitment to providing personalized service 
                             and expert insights into the real estate market. 
                        </p>
                        <p>
                            Since our founding in 2005, HomeHive has guided countless clients through the complexities of
                             buying, selling, and renting properties. Our team of dedicated professionals is here to ensure
                              that whether you are buying for the first time or looking to expand your investment portfolio,
                               you have the support you need to make informed decisions.
                        </p>
                        <p>
                            Our mission is to empower clients by offering transparent, ethical, and effective real
                             estate services. We believe that a well-informed client is a satisfied client, and our
                              testimonials speak volumes about our ability to match individuals and families with their
                               dream properties.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;
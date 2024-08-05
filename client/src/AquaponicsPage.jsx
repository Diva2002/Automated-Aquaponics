import React from 'react';
import './AquaponicsPage.css';
import { Link } from "react-router-dom";

const AquaponicsPage = () => {
    return (
        <div className="aquaponics-page">
            <header className="header">
                <h1>Explore the Wonders of Aquaponics</h1>
                <p>Learn about this sustainable farming method and its amazing benefits.</p>
                <Link to="/login" id="Login" className="btn btn-default border w-100  bg-light rounded-0 text-decoration-none">
                    Let the journey begin
                </Link>
            </header>
            <main className="main-content">
                <section className="introduction">
                    <h2>WHAT IS AQUAPONICS ?</h2>
                    <p>
                    Aquaponics is a food production system that couples aquaculture (raising aquatic animals such as fish, crayfish, snails or prawns in tanks) with hydroponics (cultivating plants in water) whereby the nutrient-rich aquaculture water is fed to hydroponically grown plants.
                    Plants are grown in hydroponics systems, with their roots immersed in the nutrient-rich effluent water. This enables them to filter out the ammonia that is toxic to the aquatic animals, or its metabolites. After the water has passed through the hydroponic subsystem, it is cleaned and oxygenated, and can return to the aquaculture vessels.
                    The size, complexity, and types of foods grown in an aquaponic system can vary as much as any system found in either distinct farming discipline
                    </p>
                    <div className="intro-image d-flex">
                        <img src="src/assets/aquaponics-diagram.webp" alt="Aquaponics System" />
                        <div className="right-col">
                            <img src="src/assets/aquaponics-garden.jpg" alt="Aquaponics Setup" />
                            <img src="src/assets/aquaponics-garden1.jpeg" alt="Aquaponics Setup" />
                        </div>
                    </div>
                </section>
                <section className="benefits">
                    <h2>BENEFITS OF AQUAPONICS</h2>
                    <div className="benefits-list">
                        <div className="benefit-item">
                            <img src="src/assets/circle1.jpeg" alt="Water Efficiency" />
                            <h3>Water Efficiency</h3>
                            <p>Aquaponics uses up to 90% less water than traditional farming methods due to its recirculating system.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="src/assets/circle2.jpeg" alt="Space Efficiency" />
                            <h3>Space Efficiency</h3>
                            <p>Maximizes space usage, making it ideal for urban farming and small-scale agriculture.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="https://via.placeholder.com/150" alt="Sustainable" />
                            <h3>Sustainable</h3>
                            <p>Reduces the need for chemical fertilizers and pesticides, promoting an eco-friendly farming approach.</p>
                        </div>
                        <div className="benefit-item">
                            <img src="https://via.placeholder.com/150" alt="Dual Production" />
                            <h3>Dual Production</h3>
                            <p>Produces both fish and vegetables, providing a diverse range of products from one system.</p>
                        </div>
                    </div>
                </section>
                <section className="introduction">
                    <h3>Key Features</h3>
                    <p>
                    The system integrates advanced computer vision technology with IoT-enabled hardware to provide real-time monitoring and intelligent decision-making capabilities for enhanced plant and fish production.
                    </p>
                    <p>Computer Vision Integration: Utilizes sophisticated algorithms to analyze plant growth stages (seedling, young plant, mature plant), optimizing cultivation strategies.
                        IoT-Enabled Hardware: Monitors crucial water quality parameters (temperature, pH, nutrient levels, dissolved oxygen) using sensor nodes, ensuring optimal conditions for aquaponic ecosystems.
                        User-Friendly Interface: Offers a web-based interface for remote monitoring and control, providing users with visualizations of sensor data and captured images.
                        Reliable Network Infrastructure: Establishes a robust network for seamless data transmission, enabling timely decision-making and system adjustments.
                    </p>
                </section>
            </main>
            <footer className="footer">
                <p>© 2024 Fins and Ferns. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AquaponicsPage;

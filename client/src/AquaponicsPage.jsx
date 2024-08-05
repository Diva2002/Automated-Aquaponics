import React from 'react';
import './AquaponicsPage.css';

const AquaponicsPage = () => {
    return (
        <div className="aquaponics-page">
            <header className="header">
                <h1>Explore the Wonders of Aquaponics</h1>
                <p>Learn about this sustainable farming method and its amazing benefits.</p>
            </header>
            <main className="main-content">
                <section className="introduction">
                    <h2>WHAT IS AQUAPONICS ?</h2>
                    <p>
                    Aquaponics is a food production system that couples aquaculture (raising aquatic animals such as fish, crayfish, snails or prawns in tanks) with hydroponics (cultivating plants in water) whereby the nutrient-rich aquaculture water is fed to hydroponically grown plants.
                    Plants are grown in hydroponics systems, with their roots immersed in the nutrient-rich effluent water. This enables them to filter out the ammonia that is toxic to the aquatic animals, or its metabolites. After the water has passed through the hydroponic subsystem, it is cleaned and oxygenated, and can return to the aquaculture vessels.
                    The size, complexity, and types of foods grown in an aquaponic system can vary as much as any system found in either distinct farming discipline
                    </p>
                    <div className="intro-image">
                        <img src="src/assets/aquaponics-diagram.webp" alt="Aquaponics System" />
                    </div>
                </section>
                <section className="benefits">
                    <h2>Benefits of Aquaponics</h2>
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
                <section className="images">
                    <h2>Gallery</h2>
                    <div className="image-grid">
                        <img src="https://via.placeholder.com/300x200" alt="Aquaponics Setup" />
                        <img src="https://via.placeholder.com/300x200" alt="Healthy Plants" />
                        <img src="https://via.placeholder.com/300x200" alt="Fish Tank" />
                        <img src="https://via.placeholder.com/300x200" alt="Harvested Vegetables" />
                    </div>
                </section>
                <section className="resources">
                    <h2>Additional Resources</h2>
                    <p>For more information on aquaponics, check out these resources:</p>
                    <ul>
                        <li><a href="https://www.aquaponics.org" target="_blank" rel="noopener noreferrer">Aquaponics.org</a></li>
                        <li><a href="https://www.aquaponicsjournal.com" target="_blank" rel="noopener noreferrer">Aquaponics Journal</a></li>
                        <li><a href="https://www.aquaponicsguide.com" target="_blank" rel="noopener noreferrer">Aquaponics Guide</a></li>
                    </ul>
                </section>
            </main>
            <footer className="footer">
                <p>© 2024 Aquaponics Learning Hub. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AquaponicsPage;

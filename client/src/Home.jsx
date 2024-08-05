import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { IoRefreshOutline } from "react-icons/io5";
import Nav from './Nav.jsx'

function Home() {
    const [fanActive, setFanActive] = useState(false);
    const [growLightActive, setGrowLightActive] = useState(false);
    const [humidifierActive, setHumidifierActive] = useState(false);

    const toggleFan = () => setFanActive(!fanActive);
    const toggleGrowLight = () => setGrowLightActive(!growLightActive);
    const toggleHumidifier = () => setHumidifierActive(!humidifierActive);

    const [sensorData, setSensorData] = useState({
        temperature: 35.5,
        humidity: 60,
        lightColor: 'purple',
        pH: 6.5,
    });

    const fetchSensorData = async () => {
        try {
            const response = await fetch('http://172.16.69.248/sensor');
            if (response.ok) {
                const data = await response.json();
                setSensorData({
                    temperature: data.temperature,
                    humidity: data.humidity,
                    lightColor: ['purple', 'blue'][Math.floor(Math.random() * 2)],
                    pH: data.ph_digital,
                });
            } else {
                console.error('Failed to fetch sensor data');
            }
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    useEffect(() => {
        fetchSensorData();
    }, []);

    return (
        <div className='bg1'>
            <Nav/>
            <section id="home" className="hero-section">
                <div className="container">
                    <h2>Welcome to Our Automated Aquaponics System</h2>
                    <p>Optimizing your aquaculture with advanced technology</p>
                    <a href="#dashboard" className="btn">Get Started</a>
                </div>
            </section>
            <section id="dashboard">
            <div className="cont-dashboard">
                <h2>IMAGES</h2>

                <div className="img-collage">
                    <div className="img-row1">
                        <img src="./src/assets/day21.jpg" alt="plant1" className="img"/>
                        <img src="./src/assets/day31.jpg" alt="plant4" className="img"/>
                        <img src="./src/assets/day26.jpg" alt="plant3" className="img"/>
                    </div>
                    <div className="img-row2">
                        <img src="./src/assets/day26.jpg" alt="plant3" className="img"/>
                        <img src="./src/assets/day25.jpg" alt="plant2" className="img"/>
                        <img src="./src/assets/day26.jpg" alt="plant1" className="img"/>
                    </div>
                </div>
                <p>plants on 01-08-2024 12:56</p>
                {/* <div className="img-collage">
                    <div className="img-row1">
                        <img src="./src/assets/fish1.jpeg" alt="fish1" className="img"/>
                        <img src="./src/assets/fish2.jpeg" alt="fish2" className="img"/>
                        <img src="./src/assets/fish3.jpeg" alt="fish3" className="img"/>
                    </div>
                    <div className="img-row2">
                        <img src="./src/assets/fish4.jpeg" alt="fish4" className="img"/>
                        <img src="./src/assets/fish1.jpeg" alt="fish5" className="img"/>
                        <img src="./src/assets/fish2.jpeg" alt="fish6" className="img"/>
                    </div>
                </div>
                <p>fishes on 01-08-2024 12:56</p> */}
            </div>
            <div className="cont-dashboard">
                <div className="sensor-data-display">
                    <h3>SENSOR DATA</h3>
                    <div className="refresh" onClick={fetchSensorData}><IoRefreshOutline /></div>
                    <div className="sensor-data d-flex" >
                        <div className="sensor">
                            <h4>Temperature</h4>
                            <p>{sensorData.temperature}°C</p>
                        </div>
                        <div className="sensor">
                            <h4>Humidity</h4>
                            <p>{sensorData.humidity}%</p>
                        </div>
                        <div className="sensor">
                            <h4>Light Color</h4>
                            <p>{sensorData.lightColor}</p>
                        </div>
                        <div className="sensor">
                            <h4>pH</h4>
                            <p>{sensorData.pH}</p>
                        </div>
                    </div>
                    <div className="service">
                        <div className="control">
                            <button
                                id="fan-control"
                                className={`toggle-button ${fanActive ? 'active' : ''}`}
                                onClick={toggleFan}
                            > Fan </button>
                            <button
                            id="grow-light-control"
                            className={`toggle-button ${growLightActive ? 'active' : ''}`}
                            onClick={toggleGrowLight}
                            >
                            Grow Light
                            </button>
                            <button
                            id="humidifier-control"
                            className={`toggle-button ${humidifierActive ? 'active' : ''}`}
                            onClick={toggleHumidifier}
                            >
                            Humidifier
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </div>
    )
}

export default Home
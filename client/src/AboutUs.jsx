import React from 'react';
import './AboutUs.css';
import Nav from './Nav';

const teamMembers = [
  { name: 'Alice Johnson', role: 'Project Lead', imgSrc: 'https://via.placeholder.com/150', intro: 'Alice is the driving force behind our project, ensuring everything runs smoothly and efficiently.' },
  { name: 'Bob Smith', role: 'Software Engineer', imgSrc: 'https://via.placeholder.com/150', intro: 'Bob develops the software that powers our system, integrating various technologies seamlessly.' },
  { name: 'Carol Davis', role: 'Electrical Engineer', imgSrc: 'https://via.placeholder.com/150', intro: 'Carol designs and manages the electrical systems, ensuring everything operates reliably.' },
  { name: 'David Lee', role: 'Data Analyst', imgSrc: 'https://via.placeholder.com/150', intro: 'David analyzes data from our system to optimize performance and provide actionable insights.' },
  { name: 'Emma Brown', role: 'Systems Integrator', imgSrc: 'https://via.placeholder.com/150', intro: 'Emma integrates various system components, ensuring all parts of the project work together flawlessly.' },
];

function AboutUs() {
  return (
    <div className='bg1'>
        <Nav/>
        <div className="about-us">
        <section className="intro">
            <h1>About Us</h1>
            <p>
            Automated Aquaponics is an innovative project aimed at integrating fish farming with plant cultivation in a
            sustainable and automated environment. Our system leverages advanced technology to monitor and control the
            conditions, ensuring optimal growth and resource efficiency.
            </p>
        </section>
        <section className="team">
            <h2>Meet the Team</h2>
            <div className="team-grid">
            {teamMembers.map(member => (
                <div className="team-member" key={member.name}>
                <div className="front">
                    <img src={member.imgSrc} alt={member.name} />
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                </div>
                <div className="back">
                    <p>{member.intro}</p>
                </div>
                </div>
            ))}
            </div>
        </section>
        <section id="contact" class="contact">
            <div class="container">
                <h2>Contact Us</h2>
                <form>
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required/>
                    
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required/>
                    
                    <label for="message">Message</label>
                    <textarea id="message" name="message" required></textarea>
                    
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
        </div>
    </div>
  );
}

export default AboutUs;

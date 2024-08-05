import React from 'react';
import './Home.css'
import './Nav.css'
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Navbar from 'react-bootstrap/Navbar';

function Nav() {
    return (
        <div className='nav'>
            <Navbar expand="lg" className="bg-body-tertiary nav">
            <Container>
                    <Navbar.Brand href="/home"><img src='src/assets/logo.png'/></Navbar.Brand>
                    <Navbar.Brand href="/home">FINS AND FERNS</Navbar.Brand>
            </Container>
            <Navbar.Brand href="/home" className='nav1'>Home</Navbar.Brand>
            <div className='divider'>|</div>
            <Navbar.Brand href="/about" className='nav1'>About Us</Navbar.Brand>
            <div className='divider'>|</div>
            <Navbar.Brand href="/predictions" className='nav1'>AI Predictions</Navbar.Brand>
            <div className='divider'>|</div>
            <Navbar.Brand href="/" className='nav1'><RiLogoutBoxRLine/></Navbar.Brand>
            </Navbar>
        </div>
    );
}
export default Nav;
import React from 'react';
import './Home.css'
import './Nav.css'
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from 'react-bootstrap/Navbar';
import { RiLineHeight, RiLogoutBoxRLine } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";

function Nav() {
    return (
        <div className='nav'>
            <Navbar expand="lg" className="bg-body-tertiary nav">
            <Container>
                    <Navbar.Brand href="/home"><img src='src/assets/logo.png'/></Navbar.Brand>
                    <Navbar.Brand href="/home">FINS AND FERNS</Navbar.Brand>
            </Container>
            <Navbar.Brand href="/about" className='nav1'>About</Navbar.Brand>
            <div className='divider'>|</div>
            <Navbar.Brand href="/images" className='nav1'>Images</Navbar.Brand>
            <div className='divider'>|</div>
            <Navbar.Brand href="/predictions" className='nav1'>AI Predictions</Navbar.Brand>
            <div className='divider'>|</div>
            <Navbar.Brand href="/login"><RiLogoutBoxRLine/></Navbar.Brand>
            </Navbar>
        </div>
    );
}
export default Nav;
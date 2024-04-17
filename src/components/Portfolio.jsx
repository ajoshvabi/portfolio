import React, { useEffect, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import cv from '../assets/Ajosh_V_Abi_.pdf';
import abtimg from '../assets/about.jpg';
import amazon1 from '../assets/amazon1.png';
import amazon2 from '../assets/amazon2.png';
import api from '../assets/api.png';
import bgimg from '../assets/bgimg.png';
import addressbuk1 from '../assets/errorbg.png';
import jet1 from '../assets/jet1.png';
import jet2 from '../assets/jet2.png';
import jobimg from '../assets/jobportal.jpeg';
import jobvideo from '../assets/videojob.mp4';

import "./portfolio.css";
export const Portfolio = () => {
    const [theme, settheme] = useState(false)
    const [category, setCategory] = useState(false)
    const [scrolled, setScrolled] = useState(false);

    const changecategory = () => {
        setCategory(!category)
    }
    useEffect(() => {
        console.log(theme);
        document.body.className = theme ? 'darkTheme' : 'lightTheme';
        // 
    }, [theme, category])
    const words = [
        'Hi i am Ajosh',
        'Flutter Developer',
        'MERN stack Developer',
        'Front-end Developer',
        'Back-end Developer',
        'Mobile App Developer',
    ];
    const [part, setPart] = useState('');
    let i = 0;
    let offset = 0;
    const len = words.length;
    let forwards = true;
    let skip_count = 0;
    const skip_delay = 15;
    const speed = 70;

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (forwards) {
                if (offset >= words[i].length) {
                    ++skip_count;
                    if (skip_count === skip_delay) {
                        forwards = false;
                        skip_count = 0;
                    }
                }
            } else {
                if (offset === 0) {
                    forwards = true;
                    i++;
                    offset = 0;
                    if (i >= len) {
                        i = 0;
                    }
                }
            }
            setPart(words[i].substr(0, offset));
            if (skip_count === 0) {
                if (forwards) {
                    offset++;
                } else {
                    offset--;
                }
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [i, offset, forwards, skip_count]);

    const handleNavLinkClick = () => {
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
            navbarToggler.click();
        }
    };


    const handleScroll = () => {
        if (window.pageYOffset > 200) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            {/* <Fade duration={2000} triggerOnce={true}> */}
            {/* navbar */}
            <Navbar expand="lg" className="navbg fixed-top ">
                <Container >

                    <Navbar.Brand href="#home" className="icon1">
                        Aj.Dev
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls="basic-navbar-nav"
                        className={`border-0 text-white ${theme && 'bg-light p-0 rounded-1 '} `}
                    />
                    <Navbar.Collapse id="basic-navbar-nav" className="">
                        <Nav className="ms-auto">
                            <ul class="navbar-nav nav-underline" >
                                <li class="nav-item px-lg-4">
                                    <a href="#home" class="navlink " onClick={handleNavLinkClick}>Home</a>
                                </li>
                                <li class="nav-item px-lg-4">
                                    <a href="#about" class="navlink" onClick={handleNavLinkClick}>About</a>
                                </li>
                                <li class="nav-item px-lg-4">
                                    <a href="#project" class="navlink" onClick={handleNavLinkClick}>Projects </a>
                                </li>
                                <li class="nav-item px-lg-4">
                                    <a class="navlink" href="#contact" onClick={handleNavLinkClick}>Contact</a>
                                </li>
                                <li class="nav-item px-lg-4" onClick={() => { settheme(!theme) }} >
                                    {theme
                                        ?
                                        <svg viewBox="0 0 24 24" width="24" height="24" className="pointer navlink lightToggleIcon_pyhR" onClick={handleNavLinkClick}><path fill="currentColor" d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"></path></svg>
                                        :
                                        <svg viewBox="0 0 24 24" width="24" height="24" className="pointer navlink darkToggleIcon_wfgR" onClick={handleNavLinkClick}><path fill="currentColor" d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"></path></svg>
                                    }
                                </li>
                            </ul>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* navbar end*/}

            {/* hero start*/}
            <Container id="home" className="maincontainer mt-3 my-3 my-lg-0">
                <Row className="h-100">
                    <Col className="d-flex  align-items-center justify-content-center px-lg-5 pb-5 pb-lg-0 order-lg-2">
                        <Fade direction="up" duration={1000} when={true} cascade triggerOnce={true}>
                            <img src={bgimg} alt="" className="img-fluid image-with-shadow mt-3 mt-lg-0 " />
                        </Fade>
                    </Col>
                    <Col md={6} className=" d-flex align-items-center  justify-content-center  ">
                        <div className="text-lg-start text-center">
                            <Fade direction="down" duration={1000} triggerOnce={true}>
                                <div className="word mt-lg-0 "><h2 className=" welcomtext ">{part}</h2></div>
                            </Fade>
                            <Slide duration={1000} triggerOnce={true}>
                                <p className="abtme">Hello! I'm <b>Ajosh V Abi</b>, a developer based in India.</p>
                            </Slide>
                            <Fade direction="up" duration={1000} triggerOnce={true}>
                                <Row className="mt-3 d-flex justify-content-lg-start justify-content-center">
                                    {theme
                                        ?
                                        <>
                                            <Col xs={2} className="icon">
                                                <a href="https://github.com/ajoshvabi" target="_blank">

                                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 496 512">
                                                        <path fill="#E3E3E3" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                                    </svg>
                                                </a>
                                            </Col>

                                            <Col xs={2} className="icon">
                                                <a href="https://www.linkedin.com/in/ajosh-v-abi/" target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512">
                                                        <path fill="#E3E3E3" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                                    </svg>
                                                </a>
                                            </Col>
                                            {/* <Col xs={2} className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512">
                                                <path fill="#E3E3E3" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                            </svg>
                                        </Col> */}
                                            <Col xs={2} className="icon">
                                                <a href="mailto:ajoajoshvabi17@gmail.com">

                                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                                                        <path fill="#E3E3E3" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                                                    </svg>
                                                </a>
                                            </Col>
                                        </>
                                        :
                                        <>
                                            <Col xs={2} className="icon">
                                                <a href="https://github.com/ajoshvabi" target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 496 512">
                                                        <path fill="#1C1E21" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                                    </svg>
                                                </a>
                                            </Col>
                                            <Col xs={2} className="icon">
                                                <a href="https://www.linkedin.com/in/ajosh-v-abi/" target="_blank">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512">
                                                        <path fill="#000000" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
                                                    </svg>
                                                </a>
                                            </Col>
                                            {/* <Col xs={2} className="icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512">
                                                <path fill="#000000" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                            </svg>
                                        </Col> */}
                                            <Col xs={2} className="icon">
                                                <a href="mailto:ajoajoshvabi17@gmail.com">
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512">
                                                        <path fill="#000000" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" />
                                                    </svg>
                                                </a>
                                            </Col>
                                        </>
                                    }

                                </Row>
                                <Row>
                                    <Col>
                                        <a href={cv} target="_blank">
                                            <button class="btn-23 mt-4">
                                                <span class="text ">Download cv</span>
                                                <span aria-hidden="" class="marquee">View cv</span>
                                            </button>
                                        </a>
                                    </Col>
                                </Row>
                            </Fade>
                        </div>


                    </Col>

                </Row>
            </Container>
            {/* hero end*/}
            <Container className="text-lg-start text-center my-3 mt-5 techcontainer">
                <Fade direction="up" duration={1000} triggerOnce={true}>
                    <div className="my-4 mx-lg-5 mx-2 portfolio">
                        <h5>TECH STACK</h5>
                    </div>
                </Fade>
                <Row className="mx-auto ">
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="" /><br />
                            <p>Html</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>
                            <img src="	https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="" /><br />
                            <p>Css</p>
                        </Fade>

                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="" /><br />
                            <p>Js</p>
                        </Fade>

                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>
                            <img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" alt="" /><br />
                            <p>Flutter</p>
                        </Fade>

                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>
                            <img src="https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg" alt="" /><br />
                            <p>Dart</p>
                        </Fade>

                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="" className="img-fluid" /><br />
                            <p>React.js</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="" /><br />
                            <p>Node.js</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://skillicons.dev/icons?i=express" alt="" /><br />
                            <p>Express.js</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="	https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="" /><br />
                            <p>MongoDb</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://cdn.simpleicons.org/redux/764ABC" alt="" /><br />
                            <p>Redux</p>
                        </Fade>
                    </Col>

                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="" /><br />
                            <p>Firebase</p>
                        </Fade>
                    </Col>

                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="	https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="" /><br />
                            <p>Git</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://skillicons.dev/icons?i=github" alt="" /><br />
                            <p>GitHub</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="" /><br />
                            <p>Bootstrap</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://react-bootstrap.netlify.app/img/logo.svg" alt="" /><br />
                            <p> React Bootstrap</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://jwt.io/img/pic_logo.svg" alt="" /><br />
                            <p>JWT</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img className=" rounded-3 " src="data:image/png;base64,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" alt="" /><br />
                            <p>Socket.IO</p>
                        </Fade>
                    </Col>

                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://cdn.simpleicons.org/php/777BB4" alt="" /><br />
                            <p>Php</p>
                        </Fade>
                    </Col>

                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="" /><br />
                            <p>MySql</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/codeigniter/codeigniter-plain.svg" alt="" /><br />
                            <p>Codeigniter</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" alt="" /><br />
                            <p>npm</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-3 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src="	https://cdn.simpleicons.org/postman/FF6C37" alt="" /><br />
                            <p>Postman</p>
                        </Fade>
                    </Col>
                    <Col xs={3} lg={2} className="techlogo mx-lg-3 my-2 py-1 rounded-5 text-center ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <img src={api} alt="" className="rounded-5" /><br />
                            <p>API</p>
                        </Fade>
                    </Col>
                </Row>
            </Container>

            {/* about start */}
            <Container id="about" className="aboutcontainer ms-lg-5 my-3 my-lg-0 ">
                <Row>
                    <Col md className=" d-none d-lg-block  ">
                        <Fade direction="up" duration={1000} triggerOnce={true} className="mx-5">
                            <img src={abtimg} alt="" className="mx-5 about" />
                        </Fade>
                    </Col>
                    <Col md className="">
                        <div className="py-lg-4 ">
                            {/* <Fade direction="up" duration={1000} triggerOnce={true}> */}

                            <h6 className="whoi"><b>{'<!--  Who am I  -->'}</b></h6>
                            {/* </Fade> */}
                            <Fade direction="up" duration={1000} triggerOnce={true}>
                                <h4>Full-Stack Developer</h4>
                            </Fade>
                            <Fade direction="up" duration={1000} triggerOnce={true}>

                                <p className="mt-3" >
                                    I'm passionate developer who works with the Flutter and MERN stack,
                                    which involves using Flutter, Firebase, MongoDB, Express.js, React.js, and Node.js. I'm
                                    skilled in both creating the visual part of websites and the behind-thescenes coding.
                                    I really enjoy making websites and mobile apps look great and user-friendly.
                                    I'm always learning and excited to be part of a development team.
                                </p>
                            </Fade>
                        </div>
                    </Col>
                </Row>
                <h2 id="project" className=" invisible "></h2>
            </Container>
            {/* about end */}

            {/* project start */}
            <Container className="projectcontainer  text-lg-start text-center">
                <div className="my-4 mx-lg-5 mx-2 portfolio">
                    <Fade direction="up" duration={1000} triggerOnce={true}>
                        <h5>PORTFOLIO</h5>
                        <h3 >Each project is a unique piece of development 🧩</h3>
                    </Fade>
                </div>
                <Fade direction="up" duration={1000} triggerOnce={true}>

                    <Row className=" d-flex justify-content-center py-4 ">
                        <Col xs={5} className={`${category ? "categorynonactive " : 'categoryactive text-white'} d-flex pointer align-items-center justify-content-center  rounded-3 mx-2`} onClick={category ? changecategory : undefined}>
                            <label className="mx-auto py-2 fw-bolder pointer">Web Applications</label>
                        </Col>
                        <Col xs={5} className={`${category ? 'categoryactive text-white ' : 'categorynonactive'} d-flex pointer align-items-center justify-content-center  rounded-3 mx-2`} onClick={!category ? changecategory : undefined}>
                            <label className="mx-auto py-2 fw-bolder pointer">Mobile Apps</label>
                        </Col>
                    </Row>
                </Fade>
                {!category ?


                    <>
                        <h6 className="whoi my-4 mx-lg-5 mx-2 "> MERN Stack Projects</h6>




                        <Fade direction="up" duration={1500} triggerOnce={true}>

                            <Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5 mx-2">
                                <Col lg className="d-flex justify-content-center  align-items-center py-3">
                                    <div className="jobportal mx-1">
                                        <video controls poster={jobimg} className=" img-fluid ">
                                            <source src={jobvideo} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                </Col>
                                <Col lg className=" d-flex justify-content-center  align-items-center ">
                                    <div>
                                        <h5><b >Job Portal</b></h5>
                                        <p>
                                            This is a user-friendly job portal for easy job searches and applications. HR professionals can
                                            effortlessly post listings, review profiles, and make hires. The project highlights my web
                                            development skills, incorporating libraries for improved design and functionality.
                                        </p>
                                        <Row className=" mx-auto   ">
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="img-fluid1 stackicon" alt="" />
                                            </Col>

                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://skillicons.dev/icons?i=express" className=" stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="mx-2 px-3 ">
                                                <img src="https://react-bootstrap.netlify.app/img/logo.svg" className="stackicon" alt="" />
                                            </Col>
                                        </Row>
                                        <Row className="py-3">
                                            <Col>
                                                <a href="https://github.com/ajoshvabi/jobapp" target="_blank">
                                                    <button className="cssbuttons-io" >
                                                        <span>
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                                                    fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            Code
                                                        </span>
                                                    </button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </Fade>
                        <Fade direction="up" duration={1500} triggerOnce={true}>

                            <Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5  mx-2">
                                <Col md className="d-block d-lg-none d-flex justify-content-center  align-items-center py-3">
                                    <div className="chat mx-1"></div>
                                </Col>
                                <Col md className="d-flex justify-content-center  align-items-center   px-md-5">
                                    <div>
                                        <h5><b >Chat App</b></h5>
                                        <p>
                                            Created a full stack MERN chat app enabling secure one-to-one messaging with JWT for authentication
                                            and Socket.io for real-time communication.Implemented a responsive UI with React, integrated MongoDB
                                            for data storage, and ensured a smooth user experience with Reactstrap and Bootstrap.Incorporated Redux to streamline state management, improving data flow and scalability.
                                        </p>
                                        <Row className="    ">
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="img-fluid1 stackicon" alt="" />
                                            </Col>

                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://skillicons.dev/icons?i=express" className=" stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="mx-2 px-3 ">
                                                <img src="https://jwt.io/img/pic_logo.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="mx-2 px-3 ">
                                                <img src="data:image/png;base64,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" className="stackicon" alt="" />
                                            </Col>
                                        </Row>
                                        <Row className="py-3">
                                            <Col>
                                                <a href="https://github.com/ajoshvabi/chatapp.git" target="_blank">
                                                    <button className="cssbuttons-io" >
                                                        <span>
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                                                    fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            Code
                                                        </span>
                                                    </button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col md className="d-none d-lg-block d-flex justify-content-center  align-items-center">
                                    <div className="chat mx-auto"></div>
                                </Col>
                            </Row>
                        </Fade>
                        <Fade direction="up" duration={1500} triggerOnce={true}>

<Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5  mx-2">
    <Col lg className="d-flex justify-content-center  align-items-center py-3" >
        <div className="stremo mx-1"></div>
    </Col>
    <Col lg className="d-flex justify-content-center  align-items-center  px-md-5">
        <div>
            <h5><b >Streamo</b></h5>
            <p>
            Streamo is an HTML, CSS, and JavaScript-based Clone UI project designed to showcase
             frontend skills. With its modern design and user-friendly approach, Streamo offers
              a seamless and engaging experience for users exploring the platform.
            </p>
            <Row className="mx-auto   ">
            <Col xs={1} className="px-4 mx-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="img-fluid1 stackicon" alt="" />
                </Col>
                <Col xs={1} className="px-4 mx-2">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" className="img-fluid1 stackicon" alt="" />
                </Col>
            </Row>
            <Row className="py-3 mx-auto">
                <Col>
                    <a href="https://github.com/ajoshvabi/streamo.git" target="_blank">
                        <button className="cssbuttons-io" >
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                        fill="currentColor">
                                    </path>
                                </svg>
                                Code
                            </span>
                        </button>
                    </a>
                </Col>
            </Row>
        </div>
    </Col>
</Row>
</Fade>
                        <Fade direction="up" duration={1500} triggerOnce={true}>

                            <Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5  mx-2">
                                <Col lg className="d-block d-lg-none d-flex justify-content-center  align-items-center py-3">
                                    <div className="insure mx-1"></div>
                                </Col>
                                <Col lg className="d-flex justify-content-center  align-items-center   px-md-5">
                                    <div>
                                        <h5><b >Insure</b></h5>
                                        <p>
                                            Insure is a React-based UI project designed to showcase frontend skills. With its modern
                                            design and user-friendly approach, Insure offers a seamless and engaging experience for users
                                            exploring insurance details.
                                        </p>
                                        <Row className="mx-auto">
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="img-fluid1 stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" className="img-fluid1 stackicon" alt="" />
                                            </Col>
                                        </Row>
                                        <Row className="py-3">
                                            <Col xs={6} lg={3} className=" d-flex justify-content-end " >
                                                <a href="https://github.com/ajoshvabi/insure-site" target="_blank">
                                                    <button className="cssbuttons-io" >
                                                        <span>
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="16" width="16">
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                                                    fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            Code
                                                        </span>
                                                    </button>
                                                </a>
                                            </Col>
                                            <Col xs={6} lg={3} className="d-flex justify-content-start" >
                                                <a href="https://ajoshvabi.github.io/insure-site/" target="_blank">
                                                    <button className="cssbuttons-io" >
                                                        <span>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                                                                <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                                                                <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
                                                            </svg>
                                                            Demo
                                                        </span>
                                                    </button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col lg className="d-none d-lg-block d-flex justify-content-center  align-items-center">
                                    <div className="insure mx-auto"></div>
                                </Col>
                            </Row>
                        </Fade>
                       

                        <h6 className="whoi my-4 mx-lg-5 mx-2 "> Academic Projects</h6>
                        <Fade direction="up" duration={1500} triggerOnce={true}>

<Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5  mx-2">
    <Col lg className="d-flex justify-content-center  align-items-center py-3" >
        <div className="connectedcare mx-1"></div>
    </Col>
    <Col lg className="d-flex justify-content-center  align-items-center  px-md-5">
        <div>
            <h5><b >CONNECTED CARE</b></h5>
            <p>
                This project is about connect multiple hospital under a common network
                and enable easy data transfer among hospital and shift patients etc...
            </p>
            <Row className="mx-auto   ">
                <Col xs={1} className="px-4 mx-2">
                    <img src="https://cdn.worldvectorlogo.com/logos/codeigniter.svg" className=" stackicon" alt="" />
                </Col>
                <Col xs={1} className="px-4 mx-2">
                    <img src="https://cdn.worldvectorlogo.com/logos/mysql-logo.svg" className="stackicon" alt="" />
                </Col>
                <Col xs={1} className="px-4 mx-2">
                    <img src="https://cdn.worldvectorlogo.com/logos/html-1.svg" className="stackicon" alt="" />
                </Col>
                <Col xs={1} className="mx-2 px-4 ">
                    <img src="	https://cdn.worldvectorlogo.com/logos/css-3.svg" className="stackicon" alt="" />
                </Col>
            </Row>
            <Row className="py-3 mx-auto">
                <Col>
                    <a href="https://github.com/ajoshvabi/connected_care" target="_blank">
                        <button className="cssbuttons-io" >
                            <span>
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                        fill="currentColor">
                                    </path>
                                </svg>
                                Code
                            </span>
                        </button>
                    </a>
                </Col>
            </Row>
        </div>
    </Col>
</Row>
</Fade>

                        <Fade direction="up" duration={1500} triggerOnce={true}>

                            <Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5  mx-2">
                                <Col lg className="d-block d-lg-none d-flex justify-content-center  align-items-center py-3">
                                    <div className="eplan"></div>
                                </Col>
                                <Col lg className=" d-flex justify-content-center  align-items-center  px-md-5">
                                    <div>
                                        <h5><b >EPLAN MAKER</b></h5>
                                        <p>
                                            This project is about connect multiple hospital under a common network
                                            and enable easy data transfer among hospital and shift patients etc...
                                        </p>
                                        <Row className="mx-auto ">
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="	https://cdn.worldvectorlogo.com/logos/php-1.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.worldvectorlogo.com/logos/mysql-logo.svg" className=" stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://cdn.worldvectorlogo.com/logos/html-1.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="mx-2 px-4 ">
                                                <img src="	https://cdn.worldvectorlogo.com/logos/css-3.svg" className="stackicon" alt="" />
                                            </Col>
                                        </Row>
                                        <Row className="py-3 mx-auto">
                                            <Col>
                                                <a href="https://github.com/ajoshvabi/eplan_maker" target="_blank">
                                                    <button className="cssbuttons-io" >
                                                        <span>
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                                                    fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            Code
                                                        </span>
                                                    </button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col lg className="d-none d-lg-block ">
                                    <div className="eplan mx-auto "></div>
                                </Col>
                            </Row>
                        </Fade>
                     


                    </>
                    :
                    <>
                        <h6 className="whoi my-4 mx-lg-5 mx-2 "> Flutter Projects</h6>

                        <Fade direction="up" duration={1500} triggerOnce={true}>
                            <Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5 mx-2 px-md-2 px-lg-5">
                                <Col md className="d-flex justify-content-center  align-items-center py-3 d-block d-md-none">
                                    <img src={jet1} className="img-fluidd addressbuk" alt="" />
                                    <img src={jet2} className="img-fluidd addressbuk" alt="" />
                                </Col>
                                <Col md className=" d-flex justify-content-center  align-items-center">
                                    <div>
                                        <h5><b >Simple Authentication App</b></h5>
                                        <p>This Flutter app utilizes Firebase for authentication services, offering various methods
                                            such as email-password authentication and Google authentication. The app is structured
                                            with GetX for state management and navigation.
                                        </p>
                                        <Row className=" mx-auto   ">
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg" className="img-fluid1 stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" className=" stackicon" alt="" />
                                            </Col>


                                        </Row>
                                        <Row className="py-3">
                                            <Col>
                                                <a href="https://github.com/ajoshvabi/jet.git" target="_blank">
                                                    <button className="cssbuttons-io" >
                                                        <span>
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                                                    fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            Code
                                                        </span>
                                                    </button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col className="d-none d-md-block">
                                    <Row>
                                        <Col md >
                                            <img src={jet1} className="img-fluid addressbuk" alt="" />
                                        </Col>
                                        <Col md >
                                            <img src={jet2} className="img-fluid addressbuk" alt="" />
                                        </Col>
                                    </Row></Col>

                            </Row>
                        </Fade>
                        <Fade direction="up" duration={1500} triggerOnce={true}>

                            <Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5 mx-2  px-md-2 px-lg-5 py-4">
                                <Col md className="d-flex justify-content-center  align-items-center py-3">
                                    <img src={addressbuk1} className="img-fluidd addressbuk" alt="" />
                                    <img src={addressbuk1} className="img-fluidd addressbuk" alt="" />
                                </Col>
                                <Col md className=" d-flex justify-content-center  align-items-center">
                                    <div>
                                        <h5><b >Address Buk </b>(Live project)</h5>
                                        <p>
                                            Developed live Flutter project with Firebase integration for efficient shop discovery. Features Admin, Staff, and
                                            Public roles. Admins manage staff and shops; Staff update shop details. Public users
                                            search nearby shops, rate, and provide feedback. This project is live and showcases my skills in Flutter and Firebase.
                                        </p>
                                        <Row className=" mx-auto   ">
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg" className="img-fluid1 stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" className=" stackicon" alt="" />
                                            </Col>
                                        </Row>

                                    </div>
                                </Col>
                            </Row>
                        </Fade>

                        <Fade direction="up" duration={1500} triggerOnce={true}>
                            <Row className="my-3 mx-lg-5 projectborder shadow rounded-4 py-lg-5 mx-2 px-md-2 px-lg-5">
                                <Col md className="d-flex justify-content-center  align-items-center py-3 d-block d-md-none">
                                    <img src={amazon1} className="img-fluidd addressbuk" alt="" />
                                    <img src={amazon2} className="img-fluidd addressbuk" alt="" />
                                </Col>
                                <Col md className=" d-flex justify-content-center  align-items-center">
                                    <div>
                                        <h5><b >Shopping App</b></h5>
                                        <p>Created a simple Flutter shopping app with a user-friendly interface and integrated API calls
                                            for product data, showcasing proficiency in mobile app development,
                                            API integration, and UI design.
                                        </p>
                                        <Row className=" mx-auto   ">
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/flutterio/flutterio-icon.svg" className="stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2">
                                                <img src="https://www.vectorlogo.zone/logos/dartlang/dartlang-icon.svg" className="img-fluid1 stackicon" alt="" />
                                            </Col>
                                            <Col xs={1} className="px-4 mx-2 ">
                                                <img src={api} className="stackicon rounded-5" alt="" />
                                            </Col>


                                        </Row>
                                        <Row className="py-3">
                                            <Col>
                                                <a href="https://github.com/ajoshvabi/flutter_shop_app" target="_blank">
                                                    <button className="cssbuttons-io" >
                                                        <span>
                                                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M0 0h24v24H0z" fill="none"></path>
                                                                <path
                                                                    d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
                                                                    fill="currentColor">
                                                                </path>
                                                            </svg>
                                                            Code
                                                        </span>
                                                    </button>
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                                <Col className="d-none d-md-block">
                                    <Row>
                                        <Col md >
                                            <img src={amazon1} className="img-fluid addressbuk" alt="" />
                                        </Col>
                                        <Col md >
                                            <img src={amazon2} className="img-fluid addressbuk" alt="" />
                                        </Col>
                                    </Row></Col>

                            </Row>
                        </Fade>

                    </>}
            </Container>

            {/* project end */}

            <Container id="contact" className="text-lg-start text-center my-3 mt-5 contactcontainer">
                <div className="my-4 mx-lg-5 mx-2 portfolio">
                    <Fade direction="up" duration={1000} triggerOnce={true}>
                        <h5>CONTACT</h5>
                        <h3>Don't be shy! Hit me up! 👇</h3>
                    </Fade>
                </div>
                <Row className="text-lg-start text-center mt-5">
                    <Col lg className="mx-lg-5 ">
                        <Fade direction="up" duration={1000} triggerOnce={true}>
                            <Row className="bg-info1">
                                <Col lg={3} className="py-3 px-3 contactiocn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-map-search"><path d="M11 18l-2 -1l-6 3v-13l6 -3l6 3l6 -3v7.5"></path><path d="M9 4v13"></path><path d="M15 7v5"></path><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path><path d="M20.2 20.2l1.8 1.8"></path></svg>
                                </Col>
                                <Col lg={5}>
                                    <h6 className=" fw-bolder ">Location</h6>
                                    <p className="contactcontent">Kerala,India</p>
                                </Col>
                            </Row>
                        </Fade>
                    </Col>
                    <Col lg >
                        <Fade direction="up" duration={1000} triggerOnce={true}>

                            <Row>
                                <Col lg={3} className="px-3 py-3 contactiocn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-mail"><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path><path d="M3 7l9 6l9 -6"></path></svg>                            </Col>
                                <Col lg={5}>
                                    <h6 className=" fw-bolder ">Mail</h6>
                                    <a href="mailto:ajoajoshvabi17@gmail.com" target="_blank" className=" text-decoration-none "><p className=" contactcontent">ajoajoshvabi17@gmail.com</p></a>
                                </Col>
                            </Row>
                        </Fade>

                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>

            </Container>

            <hr />
            <div className="projectcontainer d-flex align-items-center justify-content-center ">
                <h5 className="my-2 py-4">Copyright © 2024. All rights are reserved</h5>
            </div>
            {/* scroll to top */}

            <div>
                <span >
                    <a href="#" onClick={scrollToTop} className={`btn btn-lg ${scrolled ? `btn-primary animate__animated animate__fadeInTopRight` : `d-none`} btn-lg-square backtotop`}>
                        <i className="fa-solid fa-arrow-up-long text-light animate__animated animate__zoomIn animate__slow animate__infinite infinite"></i>
                    </a>
                </span>
            </div>
            {/* </Fade> */}
        </>
    );
};

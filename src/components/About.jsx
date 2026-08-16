// components/AboutScreen.jsx
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'; // Added for scrolling
import { Fade } from "react-awesome-reveal";
import abtimg from '../assets/me.jpg';

export const AboutScreen = () => {
  const navigate = useNavigate();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the very top
  }, []);

  const handleNavLinkClick = (section) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="navbg fixed-top">
        <Container>
          <Navbar.Brand onClick={() => handleNavLinkClick('home')} className="icon1 pointer">
            Aj.Dev
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 text-white"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <ul className="navbar-nav nav-underline">
                <li className="nav-item px-lg-4">
                  <a className="navlink pointer" onClick={() => handleNavLinkClick('home')}>Home</a>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Navbar End */}

      {/* About Me Section */}
      <Container fluid style={{ padding: '120px 20px 50px', backgroundColor: 'var(--bg)', color: 'var(--textcolor)', minHeight: '100vh' }}>
        <Row className="align-items-center mb-5">
          {/* Image Column */}
          <Col md={5} className="d-flex align-items-center justify-content-center px-lg-5 pb-5 pb-lg-0">
            <Fade direction="up" duration={1000} triggerOnce={true}>
              <img src={abtimg} alt="Ajosh V Abi" className="aboutScreen img-fluid image-with-shadow mt-3 mt-lg-0" />
            </Fade>
          </Col>
          {/* Text Column */}
          <Col md={7}>
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>About Me</h1>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
              Hi, I'm Ajosh V Abi, a Flutter developer from India who builds beautiful, functional apps that solve real-world problems.
              I specialize in clean UI, scalable architecture, and real-time features across mobile and web platforms.
              From frontend to backend, I love turning ideas into powerful digital solutions.
              When I’m not coding, you’ll find me exploring new tech or enjoying outdoor adventures.
            </p>
            <h6 className="whoi"><b>Let's connect and build something amazing together!</b></h6>
          </Col>
        </Row>

        <Row className="px-lg-5">
          <Col>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '20px' }}>
              I’m Ajosh V Abi is a passionate and results-driven Developer based in Kerala, India, focused on building high-quality, cross-platform mobile and web applications. I specialize in Flutter and Dart, creating seamless, scalable apps with clean architecture, intuitive UI/UX, and smooth performance across Android and iOS devices. As a dedicated Software Developer in Kerala, I build fast, maintainable mobile apps powered by a strong foundation in full-stack web development.<br /><br />

              I have a proven track record of delivering production-ready apps for Android and iOS using modern development practices, state management tools like Provider, GetX, and BLoC, and integrating with Firebase, REST APIs, and SQLite. My projects include health monitoring apps, e-learning platforms, music streaming apps, and offline-first sales systems—all built with performance, modularity, and user experience in mind.<br /><br />

              In addition to mobile development, I am an experienced Full-Stack Developer and MERN Stack Developer in India, skilled in Node.js, Express.js, MongoDB, React.js, PHP, and MySQL. I’ve developed secure backend systems with JWT authentication, implemented real-time features with Socket.IO and WebRTC, and built responsive frontends using React.js and Bootstrap. My ability to handle both front and back end development allows me to take complete ownership of projects, from concept to deployment.<br /><br />

              I’m currently employed as a Flutter Developer at Reon Technology, where I focus on creating high-performance mobile applications with scalable architecture. Previously, I worked at Softzane Solutions as a MERN + Flutter Developer, contributing to both web and mobile solutions. These roles helped me develop a strong understanding of client needs, collaboration, version control, and best coding practices.<br /><br />

              As an active freelance Flutter developer in Kerala, I’m open to working on projects globally. If you're looking to hire a Flutter developer in India, or need a freelance software developer in Kerala, I can help you bring your vision to life with fast, secure, and reliable app solutions. I also work with startups and businesses as a Node.js Developer, React.js Developer, and API Integration Specialist, helping them scale their technology efficiently.<br /><br />

              Whether you're a business looking for a mobile app developer in Kerala, a startup seeking a full-stack freelancer in India, or someone searching for a Flutter Firebase Developer, I’m here to help. I take pride in delivering polished, production-grade applications on time, with a focus on usability, security, and performance.

              When I’m not coding, I enjoy exploring new technologies, contributing to open-source projects, and spending time in nature. I’m always open to new opportunities and collaborations.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};
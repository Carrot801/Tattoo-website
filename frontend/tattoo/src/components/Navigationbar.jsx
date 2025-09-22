import React, { useState, useEffect } from 'react';

const Navigationbar = ({ setCurrentPage, currentPage }) => {
  const [activeSection, setActiveSection] = useState('home');

  // Common styling for navigation links
  const linkClass = "hover:text-red-700  transition-colors duration-200";
  const activeLinkClass = "justify-start text-pink-100 text-2xl font-normal font-['Inknut_Antiqua']";
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > lastScrollY) {
          // scrolling down → hide
          setShowNavbar(false);
        } else {
          // scrolling up → show
          setShowNavbar(true);
        }
        setLastScrollY(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

  // Function to handle smooth scrolling to an element by its ID
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveSection(id);
    }
  };

  // Scroll spy functionality to detect which section is in view
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'about-section', 'gallery-section', 'contact-section'];
      const scrollPosition = window.scrollY + 100; // Offset for navigation height

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <nav 
    className={`bg-black/50 backdrop-blur-sm p-1 shadow-lg fixed top-0 left-0 right-0 z-50 transform transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}>
        <div className="container mx-auto flex items-center justify-end">
        {/* Navigation links */}
        <div className="flex items-center h-full space-x-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('home');
              setCurrentPage('home');
            }}
            className={
              (activeSection === 'home' || currentPage === 'home') 
                ? activeLinkClass 
                : linkClass + "justify-start text-white text-2xl font-normal font-['Inknut_Antiqua']"
            }
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('about-section');
            }}
            className={
              activeSection === 'about-section' 
                ? activeLinkClass 
                : linkClass + "justify-start text-white text-2xl font-normal font-['Inknut_Antiqua']"
            }
          >
            About
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('gallery-section');
              setCurrentPage('gallery');
            }}
            className={
              (activeSection === 'gallery-section' || currentPage === 'gallery') 
                ? activeLinkClass 
                : linkClass + "justify-start text-white text-2xl font-normal font-['Inknut_Antiqua']"
            }
          >
            Gallery
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleScroll('contact-section');
            }}
            className={
              activeSection === 'contact-section' 
                ? activeLinkClass 
                : linkClass + "justify-start text-white text-2xl font-normal font-['Inknut_Antiqua']"
            }
          >
            Contact
          </a>
          <a href="#">
            <img className="w-10 h-10" 
            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/instagram-new.png" 
            alt="instagram-new"/>
          </a>
          <a href="#" >
            <img className="w-10 h-10" 
            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/facebook-f.png" 
            alt="facebook-f"/>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigationbar;
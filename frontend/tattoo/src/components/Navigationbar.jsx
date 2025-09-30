import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Navigationbar = ({ setCurrentPage, currentPage }) => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Common Tailwind classes
  const linkClass = "hover:text-red-700 transition-colors duration-200 text-white text-xl sm:text-2xl font-normal font-['Inknut_Antiqua']";
  const activeLinkClass = "justify-start text-pink-100 text-xl sm:text-2xl font-normal font-['Inknut_Antiqua']";

  // Scroll hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY <= lastScrollY || window.scrollY === 0);
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Scroll spy
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ['home', 'about-section', 'gallery-section', 'contact-section'];
      const scrollPos = window.scrollY + 100; // offset for navbar
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          if (setCurrentPage) setCurrentPage(id); // update currentPage consistently
        }
      });
    };
    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [setCurrentPage]);

  // Smooth scroll to section
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setCurrentPage(id);
    }
  };

  return (
    <nav className={`bg-black/50 backdrop-blur-sm p-1 shadow-lg fixed top-0 left-0 right-0 z-50 transform transition-transform duration-500  ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="h-[30px] w-[20px] sm:h-[30px] sm:w-[30px]flex absolute top-0 left-0" onClick={() => navigate("/admin")}></div>
      <div className="container mx-auto flex items-center justify-end">
        <div className="flex flex-wrap items-center h-full space-x-4 sm:space-x-6 mr-4 sm:mr-8">
          {['home', 'about-section', 'gallery-section', 'contact-section'].map(section => (
            <a
              key={section}
              href="#"
              onClick={(e) => { e.preventDefault(); handleScrollTo(section); }}
              className={activeSection === section ? activeLinkClass : linkClass}
            >
              {section === 'home' ? 'Home' : section === 'about-section' ? 'About' : section === 'gallery-section' ? 'Gallery' :section ==='contact-section' ? 'Contact': 'Gallery'}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigationbar;

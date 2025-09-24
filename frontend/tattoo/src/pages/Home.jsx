import React from 'react'
import Img from "/images/tatttoo_home.avif"
import AboutMe from '../components/AboutMe'
import GalleryItems from '../components/GalleryItems'
import Contact from '../components/Contact'
import '../index.css';

const Home = () => {
  return (
    <div id="Home">
      <div className="relative w-full h-1/2 sm:h-screen md:h-screen lg:h-screen overflow-hidden">
        <div>
          <button>
            <div className="absolute top-[20px] left-0 w-full h-full bg-black"></div>
          </button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-[1378px] text-center justify-start text-white text-8xl font-normal font-['Playfair_Display_SC'] leading-[165.33px]">
                Ink isn't just on the skin, it's in the soul
          </div>
        </div>
        <img 
          src={Img} 
          className="absolute top-0 left-0 w-full h-full object-cover object-center" 
          alt="Home"
        />

        {/* Red overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-red-700/20"></div>

      </div>
      <AboutMe id="about-section"/>
      <GalleryItems />
      <Contact />
    </div>
  )
}

export default Home
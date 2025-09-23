import React from 'react'
import Img from "/images/tatttoo_home.avif"
import '../index.css';
const AboutMe = ({children, id}) => {
  return <div id={id} className="noise flex flex-col sm:flex-row w-full h-full lg:h-[745px] bg-red-700">

    <div className="w-full top-0 lg:w-[40%] flex items-center justify-center bg-black/20 lg:h-full">
      <img className="w-full lg:w-[470px] lg:h-[650px] object-cover object-center"
      src={Img} 
      alt="profile photo" />
    </div>
    <div className="w-full lg:w-[60%] flex flex-col items-center justify-center space-y-3 px-5 sm:space-y-10 sm:px-20">
      <div className="justify-start text-white text-4xl sm:text-6xl sm:mt-[40px] font-normal font-['Inknut_Antiqua']">
        About me
      </div>
      <div className="w-full text-left justify-start text-white text-2xl lg:text-4xl md:text-3xl  font-normal font-['Prompt']">
      "A private tattoo master dedicated to creating unique, personal works of art. Every design is crafted with precision,
       passion, and an understanding that tattoos are more than ink — they’re stories etched on skin. Working discreetly, 
      I provide an exclusive, one-on-one experience where creativity meets trust, ensuring each piece reflects the individuality of the wearer. My studio isn’t just about tattoos,
       it’s about building timeless symbols of identity."
      </div>

    </div>


    {children}
  </div>
};

export default AboutMe;
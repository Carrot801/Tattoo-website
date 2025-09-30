import React from 'react'
import '../index.css';

const Contact = () => {
  return (
    <div id="contact-section" className="contactBackground relative w-full lg:h-[925px] h-[400px] sm:h-[600px] flex flex-col justify-center">
        <div className="contactWindow absolute flex flex-col w-full h-full lg:w-[520px] lg:h-[527px] lg:left-[60px] md:w-[450px] md:h-[400px] md:left-[40px] space-y-5 items-center justify-center" >
          <div className="flex  text-white text-4xl md:text-4xl sm:text-3xl font-normal font-['Inknut_Antiqua']">
            Studio
          </div>
          <div className="flex  flex-col space-y-5 pl-5 md:pl-0 md:space-y-6 w-full sm:w-[410px] h-[200px] lg:h-[300px] justify-center text-white text-3xl md:text-3xl sm:text-2xl font-normal font-['Prompt']">
            <div className="flex items-center space-x-3 lg:space-x-5">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=JIWjN75Dtifg&format=png&color=FFFFFF" 
                alt="number-t"/>
              </a>
              <span>+380 222 222 222</span>
            </div>
            <div className="flex items-center space-x-3 lg:space-x-6">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=PedPR10iVAnY&format=png&color=FFFFFF" 
                alt="email-e"/>
              </a>
              <span>annadidyk@gmail.com</span>
            </div>
            <div className="flex items-center space-x-4 lg:space-x-6">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=3723&format=png&color=FFFFFF" 
                alt="geo-g"/>
              </a>
              <span>ul. HzTattoo</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 w-full sm:w-[400px] h-[80px]">
          <a href="https://www.instagram.com/enn_di/">
            <img className="w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12" 
            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/instagram-new.png" 
            alt="instagram-new"/>
          </a>
          <a href="#" >
            <img className="w-14 h-14 md:w-12 md:h-12 sm:w-10 sm:h-10" 
            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/facebook-f.png" 
            alt="facebook-f"/>
          </a>
          <a href="#" >
            <img className="w-15 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12" 
            src="https://img.icons8.com/?size=100&id=45163&format=png&color=FFFFFF" 
            alt="facebook-f"/>
          </a>
          </div>

        </div>
    </div>
  )
}

export default Contact
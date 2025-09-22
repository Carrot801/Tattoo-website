import React from 'react'

const Contact = () => {
  return (
    <div id="contact-section" className="contactBackground w-full max-h-[925px] lg:h-[745px] h-[600px] sm:h-[600px] flex flex-col justify-center">
        <div className="contactWindow flex flex-col absolute left-0 w-full h-[600px] lg:w-[520px] lg:h-[527px] lg:left-[60px] md:w-[450px] md:h-[400px] md:left-[40px] items-center" >
          <div className="relative top-[50px] sm:top-[20px] justify-center text-white text-5xl md:text-4xl sm:text-3xl font-normal font-['Inknut_Antiqua']">
            Studio
          </div>
          <div className="relative space-y-12 md:space-y-10 sm:space-y-5 top-[120px] md:top-[50px] sm:top-[30px] w-[410px] h-[300px] justify-center text-white text-4xl md:text-3xl sm:text-2xl font-normal font-['Prompt']">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=JIWjN75Dtifg&format=png&color=FFFFFF" 
                alt="facebook-f"/>
              </a>
              <span>+380 222 222 222</span>
            </div>
            <div className="flex items-center space-x-4 lg:space-x-6">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=PedPR10iVAnY&format=png&color=FFFFFF" 
                alt="facebook-f"/>
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
          <div className="relative flex items-center justify-center space-x-6 top-[120px] lg:top-[60px] md:top-0 sm:top-0 w-[400px] h-[80px]">
             <a href="#">
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
            <img className="w-16 h-16 md:w-14 md:h-14 sm:w-12 sm:h-12" 
            src="https://img.icons8.com/?size=100&id=45163&format=png&color=FFFFFF" 
            alt="facebook-f"/>
          </a>
          </div>

        </div>
    </div>
  )
}

export default Contact
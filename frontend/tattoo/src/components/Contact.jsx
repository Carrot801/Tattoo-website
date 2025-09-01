import React from 'react'

const Contact = () => {
  return (
    <div id="contact-section" className="contactBackground w-full max-h-[925px]  h-[745px] flex flex-col justify-center">
        <div className="contactWindow flex flex-col left-[10px] w-[520px] h-[527px] left-[60px] absolute items-center" >
          <div className="relative top-[20px] justify-center text-white text-5xl font-normal font-['Inknut_Antiqua']">
            Studio
          </div>
          <div className="relative space-y-15 top-[80px] w-[410px] h-[300px] justify-center text-white text-4xl font-normal font-['Prompt']">
            <div className="flex items-center space-x-6">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=JIWjN75Dtifg&format=png&color=FFFFFF" 
                alt="facebook-f"/>
              </a>
              <span>+380 222 222 222</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=PedPR10iVAnY&format=png&color=FFFFFF" 
                alt="facebook-f"/>
              </a>
              <span>annadidyk@gmail.com</span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" >
                <img className="w-12 h-12" 
                src="https://img.icons8.com/?size=100&id=3723&format=png&color=FFFFFF" 
                alt="geo-g"/>
              </a>
              <span>ul. HzTattoo</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center space-x-6 top-[60px] w-[400px] h-[80px]">
             <a href="#">
            <img className="w-16 h-16" 
            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/instagram-new.png" 
            alt="instagram-new"/>
          </a>
          <a href="#" >
            <img className="w-14 h-14" 
            src="https://img.icons8.com/fluency-systems-regular/48/FFFFFF/facebook-f.png" 
            alt="facebook-f"/>
          </a>
          <a href="#" >
            <img className="w-16 h-16" 
            src="https://img.icons8.com/?size=100&id=45163&format=png&color=FFFFFF" 
            alt="facebook-f"/>
          </a>
          </div>

        </div>
    </div>
  )
}

export default Contact
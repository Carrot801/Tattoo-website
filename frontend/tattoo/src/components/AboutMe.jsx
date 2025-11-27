import React ,{useState,useEffect} from 'react'
import Img from "/images/tatttoo_home.avif"
import '../index.css';
import tattoo2 from "/public/images/tattoo-2.avif";
import { useCurrentUser } from './useCurrentUser';
import { uploadImage } from '../utils/uploadImage';
const AboutMe = ({children, id}) => {
      const [profileImage, setProfileImage] = useState(null); 
      const { isAdmin } = useCurrentUser();
  
      const handleImageUpload = async (e) => {
      e.preventDefault();
      const file = e.target.elements[0].files[0];
      try {
        const uploadedData = await uploadImage(file,"PROFILE");
        if(uploadedData) {
          setProfileImage(uploadedData);
        }
        e.target.reset();
      } catch (err) {
        console.log(err.message);
      }
    };
  
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const res = await fetch("https://tattoo-website-3rg5.onrender.com/api/images");
          if (!res.ok) throw new Error("Failed to fetch images");
          const data = await res.json();
          const galleryImages = data.filter((img) => img.type === "PROFILE");
          if(galleryImages.length > 0) {
            setProfileImage(galleryImages[galleryImages.length - 1]);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchImages();
    }, []);
  
  
  return <div id={id} className="noise flex flex-col-reverse sm:flex-row w-full h-full lg:h-[745px] bg-red-700">
      {isAdmin && (
        <div className="flex flex-row top-20 sm:top-20 left-4 z-20 ">
          <form onSubmit={handleImageUpload}>
            <input type="file" accept="image/*" className="w-[270px] sm:truncate ml-2 px-4 py-2 bg-red-400 text-white rounded hover:bg-red-700 transition" />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Upload
            </button>
          </form>
        </div>
      )}
    <div className="w-full top-0 lg:w-[40%] flex-center justify-center bg-black/20 lg:h-full">
      {profileImage ? ( 
      <img className="w-full sm:h-full object-cover object-center"
      src={profileImage.url} 
      alt="profile photo" />
       ) : (
        <img className="w-full sm:h-full object-cover object-center"
          src={tattoo2} 
          alt="profile photo" />
       )}
        {/* Red overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-red-700/20"></div>
    </div>
    <div className="w-full lg:w-[60%] flex flex-col items-center justify-center px-5 sm:space-y-10 sm:px-20">
      <div className="justify-start text-white text-4xl sm:text-6xl sm:mt-[40px] font-normal font-['Inknut_Antiqua']">
        About me
      </div>
      <div className="w-full text-left justify-start text-white text-2xl lg:text-4xl md:text-3xl font-normal p-[10px] font-['Prompt']">
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
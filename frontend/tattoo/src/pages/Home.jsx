import React,{ useState,useEffect } from 'react'
import Img from "/images/tatttoo_home.avif"
import AboutMe from '../components/AboutMe'
import GalleryItems from '../components/GalleryItems'
import Contact from '../components/Contact'
import '../index.css';
import { useCurrentUser } from '../components/useCurrentUser';
import { uploadImage } from '../utils/uploadImage';
const Home = () => {
    const [mainImage, setMainImage] = useState(null); 
    const { isAdmin } = useCurrentUser();

    const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.elements[0].files[0];
    try {
      const uploatedData = await uploadImage(file,"MAIN");
      if(uploatedData) {
        setMainImage(uploatedData);
      }
      e.target.reset();
    }catch (err) {
      console.log(err.message);
    }
  };


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://tattoo-website-3rg5.onrender.com/api/images");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        const galleryImages = data.filter((img) => img.type === "MAIN");
        if(galleryImages.length > 0) {
          setMainImage(galleryImages[galleryImages.length - 1]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);


  return (
    <div id="home">
      {isAdmin && (
        <div className="absolute flex flex-row top-10 sm:top-20 left-4 z-20 ">
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
      <div className="relative w-full h-[250px] sm:h-screen overflow-hidden">
        <div>
          <button>
            <div className="absolute top-[20px] left-0 w-full h-full bg-black"></div>
          </button>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-[1378px] text-center justify-start text-white text:5xl sm:text-8xl font-normal font-['Playfair_Display_SC'] leading-[165.33px]">
                Ink isn't just on the skin, it's in the soul
          </div>
        </div>
        
        
        {mainImage ? (
          <img 
            src={mainImage.url} 
            className="absolute top-0 left-0 w-full h-full object-cover object-center" 
            alt="Home"
          />
        ) : (
          <div className="absolute top-20 left-0 w-full h-full bg-gray-800 flex justify-center text-white">
            No image uploaded yet.
          </div>
        )}

        {/* Red overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-red-700/20"></div>

      </div>
      <AboutMe id="about-section"/>
      <GalleryItems id="gallery-section"/>
      <Contact />
    </div>
  )
}

export default Home
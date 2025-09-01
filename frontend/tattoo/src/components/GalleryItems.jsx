import React, { useState } from "react";
import tattoo2 from "../assets/images/tattoo-1.avif";
import tattoo1 from "../assets/images/tattoo-2.avif";

const images = [tattoo1, tattoo2, tattoo1, tattoo2];

const getImageStyles = (pos) => {
  let scale = 0.7;
  let translateX = pos * 500;
  let opacity = 0.5;
  let zIndex = 1;
  let width = 354;
  let height = 480;

  if (pos === 0) {
    scale = 1;
    translateX = 0;
    opacity = 1;
    zIndex = 10;
    width = 480;
    height = 650;
  } else if (Math.abs(pos) === 1) {
    scale = 0.95;
    opacity = 0.8;
    zIndex = 5;
  }

  return {
    width,
    height,
    transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
    opacity,
    zIndex,
  };
};

const GalleryItems = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="galleryItemBackground relative w-full h-[745px] flex items-center justify-center overflow-hidden">
      {images.map((img, index) => {
        const pos = index - activeIndex;
        return (
          <img
            key={index}
            src={img}
            onClick={() => setActiveIndex(index)}
            className="absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out cursor-pointer object-cover"
            style={getImageStyles(pos)}
            alt={`tattoo ${index}`}
          />
        );
      })}
      {children}
    </div>
  );
};

export default GalleryItems;

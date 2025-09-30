import React, { useState, useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const getImageStyles = (pos, isMobile) => {
  let scale = 0.7;
  let translateX = pos * (isMobile ? 200 : 500); // smaller distance on mobile
  let opacity = 0.5;
  let zIndex = 1;
  let width = isMobile ? 200 : 354;
  let height = isMobile ? 300 : 480;

  if (pos === 0) {
    scale = 1;
    translateX = 0;
    opacity = 1;
    zIndex = 10;
    width = isMobile ? 280 : 480;
    height = isMobile ? 450 : 650;
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
    borderRadius: 8,
  };
};

const GalleryItems = ({ children,id }) => {
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState(null);
  const { isAdmin } = useCurrentUser();
  const [isMobile, setIsMobile] = useState(false);
  // long press timer reference
  let longPressTimer;

  const handleTouchStart = (e, imgId) => {
    if (!isAdmin) return;

    longPressTimer = setTimeout(() => {
      // get touch coordinates
      const touch = e.touches[0];
      setContextMenu({
        x: touch.clientX,
        y: touch.clientY,
        imageId: imgId,
      });
    }, 600); // 600ms hold
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer);
  };

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("https://tattoo-website-3rg5.onrender.com/api/images");
        if (!res.ok) throw new Error("Failed to fetch images");
        const data = await res.json();
        const galleryImages = data.filter((img) => img.type === "GALLERY");

        setImages(galleryImages);
      } catch (err) {
        console.error(err);
      }
    };
    fetchImages();
  }, []);

  const handleDelete = async (id) => {
    setContextMenu(null);
    try {
      const res = await fetch(`https://tattoo-website-3rg5.onrender.com/api/images/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete image");
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      alert("Failed to delete image: " + err.message);
    }
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const file = e.target.elements[0].files[0];
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("type", "GALLERY");
    formData.append("title", "Tattoo Image");
    formData.append("description", "Tattoo description");

    try {
      const response = await fetch("https://tattoo-website-3rg5.onrender.com/api/images", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.error || "Image upload failed");
        return;
      }
      setImages((prev) => [...prev, data.image]);
      e.target.reset();
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);

    fetch("https://tattoo-website-3rg5.onrender.com/api/images/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ order: reordered.map((img, index) => ({ id: img.id, position: index })) }),
    }).catch(() => console.warn("Failed to update order on server"));
  };

  return (
    <div div id={id}
      className="bg-black relative w-full h-[600px] sm:h-[745px] flex items-center justify-center overflow-hidden"
      onClick={() => setContextMenu(null)}
    >
      {isAdmin && (
        <div className="absolute flex flex-row  top-4 left-4 z-20 ">
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

      {images.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gallery" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {images.map((img, index) => {
                  const pos = index - activeIndex;
                  return (
                    <Draggable
                      key={img.id}
                      draggableId={String(img.id)}
                      index={index}
                      isDragDisabled={!isAdmin}
                    >
                      {(provided) => (
                        <img
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          src={img.url}
                          crossOrigin="anonymous"
                          onClick={() => setActiveIndex(index)}
                          onContextMenu={(e) => {
                            if (isAdmin) {
                              e.preventDefault();
                              setContextMenu({ x: e.clientX, y: e.clientY, imageId: img.id });
                            }
                          }}
                          onTouchStart={(e) => handleTouchStart(e, img.id)}
                          onTouchEnd={handleTouchEnd}
                          className="absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out object-cover"
                          style={getImageStyles(pos, isMobile)}
                          alt={img.title || `tattoo ${index}`}
                        />

                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p className="text-white">No images available</p>
      )}

      {contextMenu && (
        <div
          className="absolute bg-gray-800 text-white rounded shadow-lg p-2 z-10"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="block w-full text-left hover:bg-red-500 px-2 py-1 rounded"
            onClick={() => handleDelete(contextMenu.imageId)}
          >
            🗑 Delete
          </button>
          <button
            className="block w-full text-left hover:bg-blue-500 px-2 py-1 rounded"
            onClick={() => {
              const newPosStr = prompt(
                `Enter new position (0 to ${images.length - 1}):`
              );
              if (newPosStr === null) return; // cancel clicked
              const newPos = Number(newPosStr);

              if (isNaN(newPos) || newPos < 0 || newPos >= images.length) {
                alert("Invalid position");
                return;
              }

              const idx = images.findIndex((img) => img.id === contextMenu.imageId);
              if (idx !== -1) {
                const reordered = [...images];
                const [moved] = reordered.splice(idx, 1);
                reordered.splice(newPos, 0, moved);
                setImages(reordered);

                // persist to server
                fetch("https://tattoo-website-3rg5.onrender.com/api/images/reorder", {
                  method: "PUT", // <-- changed from POST
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify({
                    order: reordered.map((img, i) => ({ id: img.id, position: i })),
                  }),
                })
                .catch(() => console.warn("Failed to update order on server"));

              }
              setContextMenu(null);
            }}
          >
            🔄 Change Position
          </button>

        </div>
      )}

      {children}
    </div>
  );
};

export default GalleryItems;

import React, { useState, useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [contextMenu, setContextMenu] = useState(null);
  const { isAdmin } = useCurrentUser();

  // Fetch images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/images");
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

  // Handle delete
  const handleDelete = async (id) => {
    setContextMenu(null);
    try {
      const res = await fetch(`http://localhost:4000/api/images/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to delete image");
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      alert("Failed to delete image: error:" ,err.message);
    }
  };

  // Handle upload
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
      const response = await fetch("http://localhost:4000/api/images", {
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

  // Handle drag end (reorder)
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(images);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setImages(reordered);

    // Optionally notify backend of new order
    fetch("http://localhost:4000/api/images/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ order: reordered.map((img) => img.id) }),
    }).catch(() => console.warn("Failed to update order on server"));
  };

  return (
    <div
      className="bg-black relative w-full h-[745px] flex items-center justify-center overflow-hidden"
      onClick={() => setContextMenu(null)} 
    >
      {/* Upload Form */}
      {isAdmin && (
        <div className="absolute top-4 left-4 z-20">
          <form onSubmit={handleImageUpload}>
            <input type="file" accept="image/*" className="text-white" />
            <button
              type="submit"
              className="ml-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Upload
            </button>
          </form>
        </div>
      )}

      {/* Render Images with Drag & Drop (admin only) */}
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
                      isDragDisabled={!isAdmin} // only admins can drag
                    >
                      {(provided) => (
                        <img
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          src={`http://localhost:4000${img.url}`}
                          crossOrigin="anonymous"
                          onClick={() => setActiveIndex(index)}
                          onContextMenu={(e) => {
                            if (isAdmin) {
                              e.preventDefault();
                              setContextMenu({
                                x: e.clientX,
                                y: e.clientY,
                                imageId: img.id,
                              });
                            }
                          }}
                          className="absolute left-1/2 top-1/2 transition-all duration-500 ease-in-out cursor-pointer object-cover "
                          style={getImageStyles(pos)}
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

      {/* Right-click Context Menu */}
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

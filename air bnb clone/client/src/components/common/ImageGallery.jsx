import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="gallery-placeholder">
        <p>No images available</p>
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <img 
          src={images[currentIndex]} 
          alt={`Property ${currentIndex + 1}`} 
          className="gallery-image"
        />
        {images.length > 1 && (
          <>
            <button className="gallery-btn gallery-btn-prev" onClick={goToPrevious}>
              ‹
            </button>
            <button className="gallery-btn gallery-btn-next" onClick={goToNext}>
              ›
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`gallery-thumbnail ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

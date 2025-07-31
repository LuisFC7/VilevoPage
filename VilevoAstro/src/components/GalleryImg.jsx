import React, { useState } from 'react';

export default function Gallery({ images }) {
  const [current, setCurrent] = useState(0);
  const length = images.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  if (!Array.isArray(images) || length === 0) return null;

  return (
    <div style={galleryContainerStyle}>
      <div style={imageWrapperStyle}>
        <button onClick={prevSlide} aria-label="Previous Slide" style={{ ...buttonStyle, left: '10px' }}>
          &#10094;
        </button>

        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Gallery Image ${index + 1}`}
            style={{
              ...imageStyle,
              display: index === current ? 'block' : 'none',
            }}
          />
        ))}

        <button onClick={nextSlide} aria-label="Next Slide" style={{ ...buttonStyle, right: '10px' }}>
          &#10095;
        </button>
      </div>

      <div style={dotsContainerStyle}>
        {images.map((_, index) => (
          <span
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...dotStyle,
              backgroundColor: index === current ? '#fff' : '#888',
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// Estilos

const galleryContainerStyle = {
  maxWidth: '95vw',       // más ancho
  margin: '40px auto 40px',
  textAlign: 'center',
  backgroundColor: '#000',
  padding: '10px',        // menos padding
  borderRadius: '6px',    // menos redondeo
  boxShadow: '0 4px 10px rgba(0,0,0,0.4)', // sombra más sutil
  color: 'white',
  userSelect: 'none',
};

const imageWrapperStyle = {
  position: 'relative',
  width: '100%',
  borderRadius: '6px',   // menos redondeo
  overflow: 'visible',
  maxHeight: '600px',    // más alto
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  maxHeight: '600px',    // más alto
  objectFit: 'contain',
  borderRadius: '6px',   // menos redondeo
};


const buttonStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'transparent',
  color: 'white',
  border: 'none',
  padding: '15px',
  cursor: 'pointer',
  borderRadius: '50%',
  fontSize: '28px',
  userSelect: 'none',
  transition: 'background-color 0.3s ease',
  zIndex: 10,
};

const dotsContainerStyle = {
  marginTop: '15px',
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const dotStyle = {
  height: '14px',
  width: '14px',
  borderRadius: '50%',
  display: 'inline-block',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

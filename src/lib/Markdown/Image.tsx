import React from 'react';

interface PropTypes {
  src: string;
  alt: string;
}

const Image: React.FC<PropTypes> = ({ src, alt }) => {
  return <img src={src} alt={alt} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
};

export default Image;

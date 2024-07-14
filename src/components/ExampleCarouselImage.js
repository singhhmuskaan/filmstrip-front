import React from 'react';
import PropTypes from 'prop-types';

function ExampleCarouselImage({ src, text }) {
    return <img className="d-block w-100" src={src} alt={text} />;
}

ExampleCarouselImage.propTypes = {
    src: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};

export default ExampleCarouselImage;

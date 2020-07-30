import React from 'react'
import PropTypes from 'prop-types'

const Image = ({uri, }) => {

  return( <img src={uri} alt="..." className="img-thumbnail" /> );
}

Image.propTypes = {                              // Indicateur variable attentes
  uri: PropTypes.string, 
};
Image.defaultProps = {                           // S'il n'est pas configuré, il s'initialise automatiquement
  uri: "https://pokeres.bastionbot.org/images/pokemon/25.png",
};

export default Image;
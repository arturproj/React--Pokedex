import React from 'react'
import PropTypes from 'prop-types'

import icon from './../../podex.png'

const Image = ({uri, name}) => {

  return( <img src={uri} alt={name} className="img-thumbnail" /> );
}

Image.propTypes = {                              // Indicateur variable attentes
  uri: PropTypes.string, 
  name: PropTypes.string,
};
Image.defaultProps = {                           // S'il n'est pas configuré, il s'initialise automatiquement
  uri: icon,
  name: "pokedex",
};

export default Image;
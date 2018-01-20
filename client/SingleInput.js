import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => (  
  <div>
  	<label>{ props.label }</label>
  	<input type="text" />
  </div>
);


export default SingleInput;  
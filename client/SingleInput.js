import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => (  
  <div className="word-box">
  	<input className="word" type="text" />
  	<label>{ props.label }</label>
  </div>
);


export default SingleInput;  

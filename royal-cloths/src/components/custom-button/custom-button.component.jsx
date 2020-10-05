import React from 'react';

import './custom-button.style.scss';

const CustomeButton = ({ children, isGoogleSignIn, inverted, ...otherProps }) => (

   <button className={`
   ${inverted ? 'inverted' : ''} 
   ${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
      {...otherProps}
   >
      {children}
   </button>
);

export default CustomeButton;
import React from 'react';

import './custom-button.style.scss';

const CustomeButton = ({ children, isGoogleSignIn, ...otherProps }) => (
   <button className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
      {children}
   </button>
);

export default CustomeButton;
import React from 'react';

import './with-spinner.style.scss';

const WithSpinner = WrapperdComponent => ({ isLoading, ...otherProps }) => {
   return isLoading ? (
      <div className="spinner-overlay">
         <div className="spinner-container">
         </div>
      </div>
   ) : (
         <WrapperdComponent { ...otherProps } />
      );
}

export default WithSpinner;
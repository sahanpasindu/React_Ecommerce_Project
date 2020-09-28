import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { auth } from '../../firebase/firebase.utils';

import './header.style.scss';

const Header = ({ currentUser }) => (
   <div className="header">
      <Link to="/" className='logo-container'>
         <Logo className='logo' />
      </Link>
      <div className="options">
         <Link to='/shop' className='option'>SHOP</Link>
         <Link to='/contact' className='option'>CONTACT</Link>
         {
            currentUser
               ? (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>)
               : (<Link className='option' to='/signin'>SIGN IN</Link>)
         }
      </div>
   </div>
);

export default Header;
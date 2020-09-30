import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.style.scss';

class SignIn extends React.Component {
   constructor() {
      super();

      this.state = {
         email: '',
         password: ''
      }
   }

   handleSubmit = async event => {
      event.preventDefault();
      const { email, password } = this.state;

      try {
         await auth.signInWithEmailAndPassword(email, password);
         this.setState({ email: '', password: '' });
      } catch (error) {
         console.error(error);
      }


   }

   handleChange = event => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
   }

   render() {
      return (
         <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={this.handleSubmit}>

               <FormInput
                  type="email"
                  name="email"
                  value={this.state.email}
                  required
                  label="Email"
                  handleChange={this.handleChange} />

               <FormInput
                  type="password"
                  name="password"
                  value={this.state.password}
                  required
                  label="Password"
                  handleChange={this.handleChange} />

               <div className="buttons">
                  <CustomButton type="submit" value="Submit"> Sign in</CustomButton>
                  <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn> Sign in with Google</CustomButton>
               </div>
            </form>
         </div>
      );
   }
}

export default SignIn;
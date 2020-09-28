import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signInWithGoogle } from '../../firebase/firebase.utils';

import './sign-in.style.scss';

class SignIn extends React.Component {
   constructor() {
      super();

      this.state = {
         email: '',
         password: ''
      }
   }

   handleSubmit = event => {
      event.preventDefault();
      this.setState({ email: '', password: '' });
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

               <CustomButton type="submit" value="Submit"> Sign in</CustomButton>
               <CustomButton onClick={signInWithGoogle}> Sign in with Google</CustomButton>
            </form>
         </div>
      );
   }
}

export default SignIn;
import React from 'react';
import StripeCehckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
   const priceForStripe = price * 100;
   const publishableKey = 'pk_test_51He85rHVPOK81INbX1WDnUoa6BCjFRbyeP3GMjs5Wuumbw4aUuhjrPSQHjBrRwHmVv14bNkzuNujQ5NSeuhdsYRA00KQQIVIRz';

   const onToken = token => {
      console.log(token);
      alert('Payment Successful');
   }

   return (
      <StripeCehckout
         label="Pay Now"
         name="Royal Cloths"
         billingAddress
         shippingAddress
         image="https://sendeyo.com/up/d/f3eb2117da"
         description={ `Your total is $${price}` }
         amount={ priceForStripe }
         panelLabel="Pay Now"
         token={ onToken }
         stripeKey={ publishableKey }
      />
   )
}

export default StripeCheckoutButton;
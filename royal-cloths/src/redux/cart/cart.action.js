import { CartActionType } from './cart.types';

export const toggleCartHidden = () => ({
   type: CartActionType.TOGGLE_CART_HIDDEN,
});
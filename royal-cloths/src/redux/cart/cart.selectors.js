import { createSelector } from "reselect";

const selectCart = (state) => state.cart;
// a function which takes whole state just returns slice of it. in here it is cart
// we have user, cart states in our main state object

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

// createSelector is a function which take two arguments
// 1) collection which is array of input selectors
// 2) function which will return the value of the selector

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

import { createSlice } from "@reduxjs/toolkit";

export const cartProductSlice = createSlice({
  name: "cartProduct",
  initialState: {
    cartProductsList: [],
  },
  reducers: {
    addToCart(state, action) {
      const productExists = state.cartProductsList.some(
        (product) => product._id === action.payload._id,
      );

      if (!productExists) {
        state.cartProductsList.push({
          ...action.payload,
          quantity: action.payload.quantity ?? 1,
        });
      }
    },
    removeFromCart(state, action) {
      state.cartProductsList = state.cartProductsList.filter(
        (product) => product._id !== action.payload._id,
      );
    },
    increment(state, action) {
      const product = state.cartProductsList.find(
        (item) => item._id === action.payload._id,
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decrement(state, action) {
      const product = state.cartProductsList.find(
        (item) => item._id === action.payload._id,
      );
      if (!product) return;

      // If quantity is greater than 1, decrement. Otherwise remove the product.
      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.cartProductsList = state.cartProductsList.filter(
          (p) => p._id !== action.payload._id,
        );
      }
    },
    clearCart(state) {
      state.cartProductsList = [];
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, clearCart } =
  cartProductSlice.actions;

// Selectors
export const selectCartProducts = (state) => state.cartProduct.cartProductsList;

export const selectCartSubtotal = (state) =>
  state.cartProduct.cartProductsList.reduce((sum, p) => {
    const price = Number(p?.price || 0);
    const qty = Number(p.quantity || 1);
    return sum + price * qty;
  }, 0);

export default cartProductSlice.reducer;

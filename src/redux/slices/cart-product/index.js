import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const cartProductSlice = createSlice({
  name: "cartProduct",
  initialState: {
    cartProductsList: [],
  },
  reducers: {
    addToCart(state, action) {
      // 1. Find the item if it already exists in the cart
      const productExists = state.cartProductsList.find(
        (product) => product._id === action.payload._id,
      );

      if (productExists) {
        // 2. If it exists, increase its quantity by 1
        productExists.quantity += 1;
      } else {
        // 3. If it is new, push it with a default quantity of 1
        state.cartProductsList.push({
          ...action.payload,
          quantity: action.payload.quantity ?? 1,
        });
      }
      // 4. Show the success message for both scenarios
      toast.success("Added to cart");
    },
    removeFromCart(state, action) {
      state.cartProductsList = state.cartProductsList.filter(
        (product) => product._id !== action.payload._id,
      );
      toast.error("Item removed from cart");
    },
    increment(state, action) {
      const product = state.cartProductsList.find(
        (item) => item._id === action.payload._id,
      );
      if (product) {
        product.quantity += 1;
        toast.success("Quantity Increased");
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
        toast.warn("Quantity Decreased");
      } else {
        state.cartProductsList = state.cartProductsList.filter(
          (p) => p._id !== action.payload._id,
        );
        toast.error("Item removed from cart");
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

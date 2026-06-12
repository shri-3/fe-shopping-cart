import { configureStore } from "@reduxjs/toolkit";
import cartProductSlice from "./slices/cart-product";
import searchProductSlice from "./slices/search-product";

const CART_STORAGE_KEY = "shoppingCartItems";

const loadCartFromLocalStorage = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(CART_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Failed to load cart from localStorage", error);
    return [];
  }
};

const saveCartToLocalStorage = (cartProductsList) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cartProductsList),
    );
  } catch (error) {
    console.warn("Failed to save cart to localStorage", error);
  }
};

const preloadedState = {
  cartProduct: {
    cartProductsList: loadCartFromLocalStorage(),
  },
};

export const store = configureStore({
  reducer: {
    cartProduct: cartProductSlice,
    searchProduct: searchProductSlice,
  },
  preloadedState,
});

store.subscribe(() => {
  saveCartToLocalStorage(store.getState().cartProduct.cartProductsList);
});

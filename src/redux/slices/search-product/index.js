import { createSlice } from "@reduxjs/toolkit";

export const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState: {
    searchResults: [],
    productResults: [],
    ratingResults: [],
    categoryResults: [],
    shortPriceResults: [],
  },
  reducers: {
    setPriceResults(state, action) {
      state.searchResults = action.payload;
    },
    setProductResults(state, action) {
      state.productResults = action.payload;
    },
    setRatingResults(state, action) {
      state.ratingResults = action.payload;
    },
    setCategoryResults(state, action) {
      state.categoryResults = action.payload;
    },
    setShortPriceResults(state, action) {
      state.shortPriceResults = action.payload;
    },
  },
});

export const {
  setPriceResults,
  setProductResults,
  setRatingResults,
  setCategoryResults,
  setShortPriceResults,
} = searchProductSlice.actions;

export const selectSearchResults = (state) => state.searchProduct.searchResults;
export const selectProductResults = (state) =>
  state.searchProduct.productResults;
export const selectRatingResults = (state) => state.searchProduct.ratingResults;
export const selectCategoryResults = (state) =>
  state.searchProduct.categoryResults;
export const selectShortPriceResults = (state) =>
  state.searchProduct.shortPriceResults;

export default searchProductSlice.reducer;

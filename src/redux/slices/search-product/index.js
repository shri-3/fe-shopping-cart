import { createSlice } from "@reduxjs/toolkit";

export const searchProductSlice = createSlice({
  name: "searchProduct",
  initialState: {
    searchResults: [],
    productResults: [],
    ratingResults: [],
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
  },
});

export const { setPriceResults, setProductResults, setRatingResults } =
  searchProductSlice.actions;

export const selectSearchResults = (state) => state.searchProduct.searchResults;
export const selectProductResults = (state) =>
  state.searchProduct.productResults;
export const selectRatingResults = (state) => state.searchProduct.ratingResults;

export default searchProductSlice.reducer;

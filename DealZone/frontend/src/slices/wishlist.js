import { createSlice } from '@reduxjs/toolkit';
import { addToWishlistAsync, clearWishlistAsync, deleteFromWishlistAsync, getWishlistAsync } from '../thunks/wishlistThunk';
import { REQUEST_STATE } from './util';

const initialState = {
  items: [],
  getWishlist: REQUEST_STATE.IDLE,
  addToWishlist: REQUEST_STATE.IDLE,
  deleteFromWishlist: REQUEST_STATE.IDLE,
  clearWishlist: REQUEST_STATE.IDLE,
  loading: false,
  error: null
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWishlistAsync.pending, (state) => {
        state.getWishlist = REQUEST_STATE.PENDING;
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlistAsync.fulfilled, (state, action) => {
        state.getWishlist = REQUEST_STATE.FULFILLED;
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getWishlistAsync.rejected, (state, action) => {
        state.getWishlist = REQUEST_STATE.REJECTED;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(addToWishlistAsync.pending, (state) => {
        state.addToWishlist = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        state.addToWishlist = REQUEST_STATE.FULFILLED;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.addToWishlist = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteFromWishlistAsync.pending, (state) => {
        state.deleteFromWishlist = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteFromWishlistAsync.fulfilled, (state, action) => {
        state.deleteFromWishlist = REQUEST_STATE.FULFILLED;
        state.items = state.items.filter(item => item._id !== action.payload);
      })
      .addCase(deleteFromWishlistAsync.rejected, (state, action) => {
        state.deleteFromWishlist = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(clearWishlistAsync.pending, (state) => {
        state.clearWishlist = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(clearWishlistAsync.fulfilled, (state, action) => {
        state.clearWishlist = REQUEST_STATE.FULFILLED;
        state.items = [];
      })
      .addCase(clearWishlistAsync.rejected, (state, action) => {
        state.clearWishlist = REQUEST_STATE.REJECTED;
        state.error = action.error;
      });
  }
});

export default wishlistSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { 
    loginUser,
    registerUser,
    logoutUser,
    fetchSubscriptions,
    fetchFavourites,
} from '../thunks/userThunks';

const initialState = {
  user: JSON.parse(localStorage.getItem('authUser')) || null,
  isAuthenticated: localStorage.getItem('authToken') ? true : false,
  collections: JSON.parse(localStorage.getItem('Collections')) || [],
  loading: false,
  error: null,
  subscriptions: JSON.parse(localStorage.getItem('subscriptions')) || [],
  favourites: JSON.parse(localStorage.getItem('favourites')) || [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.users[0] || action.payload;
        state.collections = action.payload.data.collections || [];
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Logout failed';
      })
      // Fetch Subscriptions
      .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload.subscriptions || action.payload || [];
        state.error = null;
      })
      .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch subscriptions';
      })
      // Fetch Favourites
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload.favourites || action.payload || [];
        state.error = null;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch favourites';
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 
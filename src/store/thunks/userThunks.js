import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../utils/api';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/auth/login', credentials);
      // Save token to localStorage if present
      if (response.data?.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/auth/register', userData);
      // Save token to localStorage if present
      if (response.data?.token) {
        localStorage.setItem('authToken', response.data.token);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
); 

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/auth/logout');

      console.log(response)
      localStorage.removeItem('authToken');
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
); 
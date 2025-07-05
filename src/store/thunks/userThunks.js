import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../utils/api';
import { toast } from 'sonner';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/auth/login', credentials);
      // Save token to localStorage if present
      console.log(response.data.data)
      if (response.data?.data?.access_token) {
        localStorage.setItem('authUser', JSON.stringify(response.data.data.users[0]));
        localStorage.setItem('Collections', JSON.stringify(response.data.data.collections));
        localStorage.setItem('authToken', response.data.data.access_token);
      }
      if (response.data?.status === 'success') {
        toast.success('Login successful');
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
      const response = await apiService.post('/auth/signup', userData);
      // Save token to localStorage if present
      if (response.data?.data?.access_token) {
        localStorage.setItem('authUser', JSON.stringify(response.data.data.users[0]));
        
        localStorage.setItem('authToken', response.data.data.access_token);
      }
      if (response.data?.status === 'success') {
        toast.success('Registration successful');
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
      localStorage.removeItem('authUser');
      localStorage.removeItem('Collections');
      return { success: true };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
); 
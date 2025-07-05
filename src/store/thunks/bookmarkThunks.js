import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../utils/api';

// Async thunks for bookmark operations
export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchBookmarks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get('/bookmarks/search?query=%3CRECOMMENDED%20FOR%20YOU%3E&page_no=1&limit=12');
      // Handle the nested response structure
      console.log('-----------------------',response)
      return response.data.data.bookmarks || response.data.bookmarks || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookmarks');
    }
  }
);

export const createBookmark = createAsyncThunk(
  'bookmarks/createBookmark',
  async (bookmarkData, { rejectWithValue }) => {
    try {
      const response = await apiService.post('/bookmarks', bookmarkData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create bookmark');
    }
  }
);

export const updateBookmark = createAsyncThunk(
  'bookmarks/updateBookmark',
  async ({ id, bookmarkData }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(`/bookmarks/${id}`, bookmarkData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update bookmark');
    }
  }
);

export const deleteBookmark = createAsyncThunk(
  'bookmarks/deleteBookmark',
  async (id, { rejectWithValue }) => {
    try {
      await apiService.delete(`/bookmarks/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete bookmark');
    }
  }
);

export const toggleBookmark = createAsyncThunk(
  'bookmarks/toggleBookmark',
  async ({ url, title, description }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const existingBookmark = state.bookmarks.items.find(
        bookmark => bookmark.url === url
      );

      if (existingBookmark) {
        // If bookmark exists, delete it
        await apiService.delete(`/bookmarks/${existingBookmark.id}`);
        return { action: 'delete', id: existingBookmark.id };
      } else {
        // If bookmark doesn't exist, create it
        const response = await apiService.post('/bookmarks', {
          url,
          title,
          description,
        });
        return { action: 'create', bookmark: response.data };
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle bookmark');
    }
  }
); 
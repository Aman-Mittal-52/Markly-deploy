import { createSlice } from '@reduxjs/toolkit';
import {
  fetchBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  toggleBookmark,
} from '../thunks/bookmarkThunks';

const initialState = {
  items: [],
  loading: false,
  error: null,
  fetchLoading: false,
  createLoading: false,
  updateLoading: false,
  deleteLoading: false,
  toggleLoading: false,
  selectedBookmark: null,
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    clearBookmarkError: (state) => {
      state.error = null;
    },
    setSelectedBookmark: (state, action) => {
      state.selectedBookmark = action.payload;
    },
    clearSelectedBookmark: (state) => {
      state.selectedBookmark = null;
    },
    addBookmark: (state, action) => {
      state.items.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.items = state.items.filter(bookmark => bookmark.id !== action.payload);
    },
    updateBookmarkInState: (state, action) => {
      const index = state.items.findIndex(bookmark => bookmark.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setBookmarks: (state, action) => {
      state.items = action.payload;
    },
    resetBookmarkState: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
      state.fetchLoading = false;
      state.createLoading = false;
      state.updateLoading = false;
      state.deleteLoading = false;
      state.toggleLoading = false;
      state.selectedBookmark = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch bookmarks
    builder
      .addCase(fetchBookmarks.pending, (state) => {
        state.fetchLoading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.fetchLoading = false;
        state.error = action.payload;
      });

    // Create bookmark
    builder
      .addCase(createBookmark.pending, (state) => {
        state.createLoading = true;
        state.error = null;
      })
      .addCase(createBookmark.fulfilled, (state, action) => {
        state.createLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createBookmark.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload;
      });

    // Update bookmark
    builder
      .addCase(updateBookmark.pending, (state) => {
        state.updateLoading = true;
        state.error = null;
      })
      .addCase(updateBookmark.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.items.findIndex(bookmark => bookmark.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateBookmark.rejected, (state, action) => {
        state.updateLoading = false;
        state.error = action.payload;
      });

    // Delete bookmark
    builder
      .addCase(deleteBookmark.pending, (state) => {
        state.deleteLoading = true;
        state.error = null;
      })
      .addCase(deleteBookmark.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.items = state.items.filter(bookmark => bookmark.id !== action.payload);
      })
      .addCase(deleteBookmark.rejected, (state, action) => {
        state.deleteLoading = false;
        state.error = action.payload;
      });

    // Toggle bookmark
    builder
      .addCase(toggleBookmark.pending, (state) => {
        state.toggleLoading = true;
        state.error = null;
      })
      .addCase(toggleBookmark.fulfilled, (state, action) => {
        state.toggleLoading = false;
        if (action.payload.action === 'create') {
          state.items.push(action.payload.bookmark);
        } else if (action.payload.action === 'delete') {
          state.items = state.items.filter(bookmark => bookmark.id !== action.payload.id);
        }
      })
      .addCase(toggleBookmark.rejected, (state, action) => {
        state.toggleLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  clearBookmarkError,
  setSelectedBookmark,
  clearSelectedBookmark,
  addBookmark,
  removeBookmark,
  updateBookmarkInState,
  setBookmarks,
  resetBookmarkState,
} = bookmarkSlice.actions;

// Export selectors
export const selectBookmarks = (state) => state.bookmarks.items;
export const selectBookmarkLoading = (state) => state.bookmarks.loading;
export const selectBookmarkError = (state) => state.bookmarks.error;
export const selectFetchBookmarksLoading = (state) => state.bookmarks.fetchLoading;
export const selectCreateBookmarkLoading = (state) => state.bookmarks.createLoading;
export const selectUpdateBookmarkLoading = (state) => state.bookmarks.updateLoading;
export const selectDeleteBookmarkLoading = (state) => state.bookmarks.deleteLoading;
export const selectToggleBookmarkLoading = (state) => state.bookmarks.toggleLoading;
export const selectSelectedBookmark = (state) => state.bookmarks.selectedBookmark;

// Helper selectors
export const selectBookmarkById = (state, id) => 
  state.bookmarks.items.find(bookmark => bookmark.id === id);

export const selectBookmarkByUrl = (state, url) => 
  state.bookmarks.items.find(bookmark => bookmark.url === url);

export const selectIsBookmarked = (state, url) => 
  state.bookmarks.items.some(bookmark => bookmark.url === url);

export default bookmarkSlice.reducer; 
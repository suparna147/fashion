import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Adjust the path as needed

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;

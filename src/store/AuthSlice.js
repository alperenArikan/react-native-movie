import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import axios from 'axios';

export const sign = createAsyncThunk(
  'Auth/login',
  async (params, {dispatch}) => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:1234/api/sign',
        params,
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  },
);

export const login = createAsyncThunk(
  'Auth/login',
  async (params, {dispatch}) => {
    try {
      const response = await axios.post(
        'http://10.0.2.2:1234/api/login',
        params,
      );
      const {data} = response;
      return data;
    } catch (err) {
      console.log(err);
    }
  },
);

const slice = createSlice({
  name: 'Auth',
  initialState: {
    currentUser: '',
  },
  reducers: {},
  extraReducers: {
    [sign.fulfilled]: (state, action) => {
      console.log('fulfilled');
    },
    [sign.pending]: (state, action) => {
      console.log('pending');
    },
    [sign.rejected]: (state, action) => {
      console.log('rejected');
    },
    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export default slice.reducer;

export const actions = slice.actions;

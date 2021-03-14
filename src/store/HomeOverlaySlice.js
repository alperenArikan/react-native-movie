import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from '@reduxjs/toolkit';

import axios from 'axios';

import {BASE_URL, API_KEY} from '@env';

export const getOverlayMovie = createAsyncThunk(
  'OverlayMovie/getOverlayMovieData',
  async (id, {dispatch}) => {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
    );

    const {data} = response;

    return data;
  },
);

export const getOverlayTv = createAsyncThunk(
  'OverlayMovie/getOverlayTv',
  async (id, {dispatch}) => {
    console.log(id);
    const response = await axios.get(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`,
    );
    const {data} = response;
    return data;
  },
);

const slice = createSlice({
  name: 'OverlayMovie',
  initialState: {
    movie: {},
    type: '',
  },
  reducers: {
    cleanOverlay: (state, action) => {
      state.movie = {};
    },
  },
  extraReducers: {
    [getOverlayMovie.fulfilled]: (state, action) => {
      state.movie = action.payload;
      state.type = 'movie';
    },
    [getOverlayTv.fulfilled]: (state, action) => {
      state.movie = action.payload;
      state.type = 'tv';
    },
  },
});
export const {cleanOverlay} = slice.actions;
export default slice.reducer;

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, API_KEY} from '@env';
const adapter = createEntityAdapter({});
export const getMovieCredits = createAsyncThunk(
  'MovieCredits/getMovieCredits',
  async (movieID, {dispatch}) => {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieID}/credits?api_key=${API_KEY}&language=en-US`,
    );
    const {data} = response;

    return data;
  },
);
const slice = createSlice({
  name: 'MovieCredits',
  initialState: {
    credits: {},
  },
  reducers: {},
  extraReducers: {
    [getMovieCredits.fulfilled]: (state, action) => {
      state.credits = action.payload;
    },
  },
});

export default slice.reducer;

export const actions = slice.actions;

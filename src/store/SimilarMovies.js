import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, API_KEY} from '@env';
const adapter = createEntityAdapter({});

export const getSimilarMovies = createAsyncThunk(
  'SimilarMovies/getSimilarMovies',
  async (id, {dispatch}) => {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
    );

    const {data} = response;
    return data.results;
  },
);
const slice = createSlice({
  name: 'SimilarMovies',
  initialState: adapter.getInitialState(),
  reducers: {},
  extraReducers: {
    [getSimilarMovies.fulfilled]: adapter.setAll,
  },
});

export const actions = slice.actions;
export const {selectAll: SelectAllSimilarMovies} = adapter.getSelectors(
  state => state.SimilarMovies,
);
export default slice.reducer;

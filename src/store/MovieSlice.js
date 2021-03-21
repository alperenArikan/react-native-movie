import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_KEY, BASE_URL} from '@env';

export const getTrendingMovies = createAsyncThunk(
  'TrendingMovies/getTrendingMovies',
  async (_, {dispatch, rejectWithValue}) => {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
    );

    const {data} = response;

    return data.results;
  },
);

const adapter = createEntityAdapter({});
const slice = createSlice({
  name: 'TrendingMovies',
  initialState: adapter.getInitialState({
    trendingMoviesLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [getTrendingMovies.pending]: (state, action) => {
      state.trendingMoviesLoading = true;
    },
    [getTrendingMovies.fulfilled]: adapter.setAll,
    [getTrendingMovies.rejected]: () => {},
  },
});

export const actions = slice.actions;
export const {selectAll: SelectAllTrendingMovies} = adapter.getSelectors(
  state => state.TrendingMovies,
);

export default slice.reducer;

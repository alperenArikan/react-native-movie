import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {API_KEY, BASE_URL} from '@env';

export const getTrendingTv = createAsyncThunk(
  'TrendingTv/getTrendingTv',
  async (_, {dispatch, rejectWithValue}) => {
    const response = await axios.get(
      `${BASE_URL}/trending/tv/day?api_key=${API_KEY}`,
    );

    const {data} = response;

    return data.results;
  },
);

const adapter = createEntityAdapter({});
const slice = createSlice({
  name: 'TrendingTv',
  initialState: adapter.getInitialState({
    trendingMoviesLoading: false,
  }),
  reducers: {},
  extraReducers: {
    [getTrendingTv.pending]: (state, action) => {
      state.trendingMoviesLoading = true;
    },
    [getTrendingTv.fulfilled]: adapter.setAll,
    [getTrendingTv.rejected]: () => {
      console.log('rejected');
    },
  },
});

export const actions = slice.actions;
export const {selectAll: SelectAllTrendingTv} = adapter.getSelectors(
  state => state.TrendingTv,
);

export default slice.reducer;

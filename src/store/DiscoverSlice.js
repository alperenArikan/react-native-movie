import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from 'axios';
import {BASE_URL, API_KEY} from '@env';
import moment from 'moment';
export const getDiscoverMovies = createAsyncThunk(
  'DiscoverMovies/getDiscoverMovies',
  async (_, {dispatch}) => {
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    const MonthAgo = moment().subtract(1, 'months').format('YYYY-MM-DD');
    console.log(tomorrow);

    console.log(MonthAgo);
    const response = await axios.get(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${MonthAgo}&primary_release_date.lte=${tomorrow}`,
    );

    const {data} = response;
    return data.results;
  },
);

const adapter = createEntityAdapter({});

const slice = createSlice({
  name: 'DiscoverMovies',
  initialState: adapter.getInitialState({}),
  reducers: {},
  extraReducers: {
    [getDiscoverMovies.fulfilled]: adapter.setAll,
  },
});
export const {selectAll: SelectAllDiscoverMovies} = adapter.getSelectors(
  state => state.DiscoverMovies,
);
export default slice.reducer;

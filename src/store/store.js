import {configureStore} from '@reduxjs/toolkit';
import TrendingMovies from './MovieSlice';
import OverlayMovie from './HomeOverlaySlice';
import DiscoverMovies from './DiscoverSlice';
import TrendingTv from './TrendingTvSlice';
import SimilarMovies from './SimilarMovies';
const reducer = configureStore({
  reducer: {
    TrendingMovies,
    OverlayMovie,
    DiscoverMovies,
    TrendingTv,
    SimilarMovies,
  },
});

export default reducer;

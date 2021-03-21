import {configureStore} from '@reduxjs/toolkit';
import TrendingMovies from './MovieSlice';
import OverlayMovie from './HomeOverlaySlice';
import DiscoverMovies from './DiscoverSlice';
import TrendingTv from './TrendingTvSlice';
import SimilarMovies from './SimilarMovies';
import MovieCredits from './CreditsSlice';
import Auth from './AuthSlice';
const reducer = configureStore({
  reducer: {
    TrendingMovies,
    OverlayMovie,
    DiscoverMovies,
    TrendingTv,
    SimilarMovies,
    MovieCredits,
    Auth,
  },
});

export default reducer;

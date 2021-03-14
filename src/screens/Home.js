import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {SelectAllTrendingMovies} from '../store/MovieSlice';
import {getTrendingMovies} from '../store/MovieSlice';
import {SelectAllDiscoverMovies} from '../store/DiscoverSlice';
import MovieCard from '../components/MovieCard';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getDiscoverMovies} from '../store/DiscoverSlice';
import {SelectAllTrendingTv, getTrendingTv} from '../store/TrendingTvSlice';
import HomeScreenOverlay from '../components/HomeScreenOverlay';
import useOverlay from '../hooks/useOverlay';
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const trendingMovies = useSelector(SelectAllTrendingMovies);
  const discoverMovies = useSelector(SelectAllDiscoverMovies);
  const trendingTv = useSelector(SelectAllTrendingTv);
  const OverlayData = useSelector(state => state.OverlayMovie.movie);
  const OverlayDataType = useSelector(state => state.OverlayMovie.type);
  React.useEffect(() => {
    dispatch(getTrendingMovies());
    dispatch(getDiscoverMovies());
    dispatch(getTrendingTv());
  }, [dispatch]);
  const {
    overlayOpenHandler,
    overlayCloseHandler,
    slideAnimation,
  } = useOverlay();

  return (
    <View style={styles.root}>
      <ScrollView>
        <Text style={styles.mainTitles}>Trends Today</Text>
        <FlatList
          style={styles.list}
          horizontal
          data={trendingMovies}
          renderItem={({item}) => (
            <MovieCard overlayHandler={overlayOpenHandler} data={item}>
              {item.title}
            </MovieCard>
          )}
          keyExtractor={item => item.id}
        />
        <Text style={styles.mainTitles}>This Month</Text>
        <FlatList
          style={styles.list}
          horizontal
          data={discoverMovies}
          renderItem={({item}) => (
            <MovieCard overlayHandler={overlayOpenHandler} data={item}>
              {item.title}
            </MovieCard>
          )}
          keyExtractor={item => item.id}
        />
        <Text style={styles.mainTitles}>Trending Series</Text>
        <FlatList
          style={styles.list}
          horizontal
          data={trendingTv}
          renderItem={({item}) => (
            <MovieCard
              type="tv"
              overlayHandler={overlayOpenHandler}
              data={item}>
              {item.title}
            </MovieCard>
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>

      <HomeScreenOverlay
        OverlayData={OverlayData}
        slideAnimation={slideAnimation}
        overlayCloseHandler={overlayCloseHandler}
        OverlayDataType={OverlayDataType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#111',
    paddingTop: 35,
  },
  mainTitles: {
    fontSize: 25,
    marginLeft: 6,
    color: '#a00',
    fontWeight: '700',
    marginBottom: 10,
  },
  list: {
    backgroundColor: '#111',
    marginBottom: 35,
    paddingVertical: 5,
  },
});
export default Home;

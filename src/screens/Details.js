import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import {Dimensions} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import {getSimilarMovies, SelectAllSimilarMovies} from '../store/SimilarMovies';
import {FlatList} from 'react-native-gesture-handler';
import MovieCard from '../components/MovieCard';
import {useDispatch, useSelector} from 'react-redux';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import useOverlay from '../hooks/useOverlay';
import HomeScreenOverlay from '../components/HomeScreenOverlay';
const Details = ({route, navigation}) => {
  const {id, type, data} = route.params;
  const {
    overlayOpenHandler,
    overlayCloseHandler,
    slideAnimation,
  } = useOverlay();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSimilarMovies(id));
  }, [data]);
  const similarMoviesData = useSelector(SelectAllSimilarMovies);
  const OverlayData = useSelector(state => state.OverlayMovie.movie);
  const OverlayDataType = useSelector(state => state.OverlayMovie.type);
  console.log(id);
  return (
    <>
      <ScrollView>
        <View style={styles.root}>
          <Image
            style={styles.BackDrop}
            source={{
              uri: `https://image.tmdb.org/t/p/w342${data?.backdrop_path}`,
            }}
          />

          <Image
            style={styles.Image}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${data?.poster_path}`,
            }}
          />
          <Text style={styles.title}>{data.title}</Text>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: windowWidth / 2, paddingHorizontal: 6}}>
              <Text style={styles.overview}>{data.overview}</Text>
            </View>

            <View
              style={{
                width: windowWidth / 2,
                paddingHorizontal: 6,
              }}>
              <Text style={styles.info}>
                {moment(data.release_date).format('DD/MM/YYYY')}
                {` - `}
                {data.status}
              </Text>
              <Text>
                <FlatList
                  horizontal
                  data={data.genres}
                  renderItem={({item}) => (
                    <Text style={styles.genres}>{item.name}</Text>
                  )}
                />
              </Text>
            </View>
          </View>
          <Text style={styles.mainTitles}>You May Like These</Text>
          <FlatList
            style={styles.list}
            horizontal
            data={similarMoviesData}
            overlayHandler={overlayOpenHandler}
            renderItem={({item}) => (
              <MovieCard overlayHandler={overlayOpenHandler} data={item} />
            )}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
      <View>
        <HomeScreenOverlay
          OverlayData={OverlayData}
          slideAnimation={slideAnimation}
          overlayCloseHandler={overlayCloseHandler}
          OverlayDataType={OverlayDataType}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#111',
  },
  BackDrop: {
    width: windowWidth,
    height: windowHeight / 2,
    opacity: 0.6,
    backgroundColor: '#000',
  },
  Image: {
    alignSelf: 'center',
    width: 275,
    height: 375,
    marginTop: -windowHeight / 2 + 125,
    marginHorizontal: 'auto',
    borderRadius: 15,
    borderColor: '#700',
    borderWidth: 1,
    marginBottom: 8,
  },
  title: {
    color: '#a00',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 6,
    marginBottom: 12,
  },
  overview: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '700',
  },
  info: {
    color: '#700',
    fontWeight: '700',
    fontSize: 13,
  },
  genres: {
    color: '#fff',
  },
  mainTitles: {
    fontSize: 25,
    marginLeft: 6,
    color: '#a00',
    fontWeight: '700',
    marginTop: 12,
    marginBottom: 10,
  },
  list: {
    backgroundColor: '#111',
    marginBottom: 35,
    paddingVertical: 5,
  },
});
export default Details;

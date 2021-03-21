import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';

import {getOverlayMovie, getOverlayTv} from '../store/HomeOverlaySlice';
import {useDispatch} from 'react-redux';

const MovieCard = ({data, overlayHandler, type}) => {
  const dispatch = useDispatch();

  const getOverlayMovieData = () => {
    if (type === 'tv') {
      dispatch(getOverlayTv(data.id));
    } else {
      dispatch(getOverlayMovie(data.id));
    }
    overlayHandler();
  };
  return (
    <View>
      <TouchableOpacity onPress={getOverlayMovieData}>
        <View style={styles.root}>
          <Image
            style={styles.image}
            source={{
              uri: `https://image.tmdb.org/t/p/w154${data.profile_path}`,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  root: {
    borderColor: '#700',
    borderWidth: 1,
    borderStyle: 'solid',
    width: 170,
    height: 240,
    marginRight: 8,
    marginLeft: 6,
    backgroundColor: '#700',
    borderRadius: 5,
    overflow: 'hidden',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 50,

    elevation: 60,
  },
  image: {
    width: 168,
    height: 240,
    borderRadius: 5,
  },
  overlay: {
    position: 'absolute',
    left: 7,
    bottom: -100,
    backgroundColor: 'rgba(15,15,15,0.6)',
    width: 170,
    height: 100,
    flexDirection: 'row',
  },
  overlayText: {
    color: '#fff',
  },
  iconContainer: {
    backgroundColor: '#700',
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    padding: 10,
  },
  icon: {
    // backgroundColor: '#700',
    // display: 'flex',
  },
});
export default MovieCard;

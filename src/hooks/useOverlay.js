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
import {cleanOverlay} from '../store/HomeOverlaySlice';
import {useDispatch} from 'react-redux';
const useOverlay = () => {
  const dispatch = useDispatch();
  const [isOverlayActive, setOverlayActive] = React.useState(false);
  const slideAnimation = React.useRef(new Animated.Value(275)).current;
  const overlayOpenHandler = () => {
    dispatch(cleanOverlay());
    if (isOverlayActive) {
      Animated.sequence([
        Animated.timing(slideAnimation, {
          toValue: 275,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnimation, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 1300,
      useNativeDriver: true,
    }).start();
    return setOverlayActive(true);
  };

  const overlayCloseHandler = () => {
    dispatch(cleanOverlay());
    Animated.timing(slideAnimation, {
      toValue: 275,
      duration: 100,
      useNativeDriver: true,
    }).start();
    setOverlayActive(false);
  };
  return {overlayOpenHandler, overlayCloseHandler, slideAnimation};
};

export default useOverlay;

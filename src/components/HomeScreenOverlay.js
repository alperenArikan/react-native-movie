import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import Ionic from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
const HomeScreenOverlay = ({
  OverlayData,
  slideAnimation,
  overlayCloseHandler,
  OverlayDataType,
}) => {
  const navigation = useNavigation();
  return (
    <Animated.View style={{...styles.overlay, translateY: slideAnimation}}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={overlayCloseHandler}>
        <Ionic name="close" size={20} color="#111" />
      </TouchableOpacity>

      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            style={styles.overlayImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w342${OverlayData?.poster_path}`,
            }}
          />
        </View>
        <View>
          <View style={styles.overlayInfo}>
            <Text style={styles.overlayTitle}>
              {OverlayData.title || OverlayData.name}
            </Text>
            <View>
              <Text style={styles.overlayYear}>
                {OverlayData?.release_date?.slice(0, 4) ||
                  OverlayData?.first_air_date?.slice(0, 4)}
              </Text>
              {OverlayData.type && (
                <Text style={styles.overlayYear}>{OverlayData.type}</Text>
              )}
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                data={OverlayData?.genres?.slice(0, 3)}
                renderItem={({item}) => {
                  return <Text style={styles.overlayGenres}>{item.name}</Text>;
                }}
                ItemSeparatorComponent={() => (
                  <Text style={styles.overlayGenres}> / </Text>
                )}
              />
            </View>

            <AnimatedCircularProgress
              size={55}
              width={5}
              fill={OverlayData.vote_average * 10}
              children={() => (
                <Text style={styles.circularInnerText}>
                  {OverlayData.vote_average}
                </Text>
              )}
              tintColor="#fff"
              backgroundColor="#111"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 15,
            }}>
            <TouchableOpacity style={styles.iconContainerBig}>
              <AntDesign name="plus" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Details', {
                  id: OverlayData.id,
                  type: OverlayDataType,
                  data: OverlayData,
                });
                overlayCloseHandler();
              }}
              style={styles.iconContainerBig}>
              <AntDesign name="info" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default HomeScreenOverlay;
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: windowWidth,
    height: 275,
    backgroundColor: '#700',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    translateY: -275,
    paddingRight: windowWidth / 2 + 35,
  },
  iconContainer: {
    position: 'absolute',
    right: 4,
    top: 4,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginLeft: 'auto',
  },
  circularInnerText: {
    color: '#999',
    fontWeight: '700',
    fontSize: 20,
  },
  overlayImage: {
    width: 200,
    height: 275,
    borderTopLeftRadius: 15,
  },
  overlayInfo: {
    paddingVertical: 12,
    paddingLeft: 8,
    flex: 1,
  },
  overlayTitle: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  overlayYear: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    marginBottom: 4,
  },
  overlayGenres: {
    fontSize: 11,
    fontWeight: '700',
    color: '#aaa',
    marginBottom: 15,
  },
  iconContainerBig: {
    width: 45,
    height: 45,
    borderColor: '#fff',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

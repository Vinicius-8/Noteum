import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  shimmer: {
    overflow: 'hidden',
    backgroundColor: '#B2B5BE',
    
  },
});

const SCREEN_WIDTH = Dimensions.get('screen').width;
const START = -1;
const END = 1;
const DURATION = 1300;
const COLORS = ['#b7b9bd', '#d6d9e3', '#babecc'];
const LOCATIONS = [0.3, 0.5, 0.7];
const ANIMATION = new Animated.Value(START);

const runAnimation = () => {
  ANIMATION.setValue(START);
  Animated.timing(ANIMATION, {
    toValue: END,
    duration: DURATION,
    easing: Easing.linear(),
    useNativeDriver: true,
  }).start(runAnimation);
};

const linear = ANIMATION.interpolate({
  inputRange: [START, END],
  outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
});

runAnimation();

const Shimmer = ({ width, height, borderRadius,borderBottomRightRadius,borderBottomLeftRadius }) => {
  const [positionX, setPositionX] = useState(null);
  let viewRef = null;
  return (
    <View
      style={[styles.shimmer, { width, height, borderRadius,borderBottomRightRadius,borderBottomLeftRadius}]}
      ref={ref => (viewRef = ref)}
      onLayout={() => {
        if (viewRef) {
          viewRef.measure((_x, _y, _width, _height, pageX, _pageY) => {
            setPositionX(pageX);
          });
        }
      }}>
      {positionX !== null && (
        <Animated.View
          style={{
            flex: 1,
            left: -positionX,
            transform: [{ translateX: linear }],
          }}>
          <LinearGradient
            style={{ flex: 1, width: SCREEN_WIDTH }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            locations={LOCATIONS}
            colors={COLORS}
          />
        </Animated.View>
      )}
    </View>
  );
};

export default Shimmer;

import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, Alert } from 'react-native';
import homeScreenStyles from '@app/screens/HomeScreen/HomeScreen.styles';
import { throttle } from '@app/functions/debounceThrottle';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withDelay,
  withRepeat,
  interpolate,
} from 'react-native-reanimated';

const HomeScreen = () => {
  const [counter, setCounter] = useState(0);
  const didMount = useRef(false);
  const throttledClick = useRef(throttle(logCounter, 1000)).current;
  const positionY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const counterAnimation = useSharedValue(0);

  const duration: number = 2000;

  function logCounter(clickCount) {
    console.log('Counter: ' + clickCount);
  }

  function incrementCounter() {
    const newCounter = counter + 1;
    setCounter(newCounter);
    positionY.value = withRepeat(withTiming(100, config), 2, true);
    opacity.value = withRepeat(withTiming(0, config), 2, true);

    counterAnimation.value = withTiming(1, { duration: 1000 });
    counterAnimation.value = withDelay(1000, withTiming(0, { duration: 1000 }));
    counterAnimation.value = withDelay(2000, withTiming(-1, { duration: 1000 }));
    counterAnimation.value = withDelay(3000, withTiming(0, { duration: 1000 }));
  }

  const config = {
    duration: duration,
    easing: Easing.out(Easing.exp),
  };

  const animationButton = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: positionY.value }],
    };
  });

  const animationCounter = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(counterAnimation.value, [-1, 0, 1], [2, 1, 2]) },
        { translateX: interpolate(counterAnimation.value, [-1, 0, 1], [20, 0, -20]) },
      ],
    };
  });

  useEffect(() => {
    if (didMount.current) {
      if (counter % 2 === 0 && counter !== 0) {
        Alert.alert('Even number.');
      }
      throttledClick(counter);
    } else {
      didMount.current = true;
    }
  }, [counter, throttledClick]);

  return (
    <Animated.View style={homeScreenStyles.container}>
      <Animated.View style={animationCounter}>
        <Text style={homeScreenStyles.text}>{counter}</Text>
      </Animated.View>
      <Animated.View style={animationButton}>
        <TouchableOpacity style={homeScreenStyles.button} onPress={incrementCounter}>
          <Text style={homeScreenStyles.buttonText}>Press</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

export default HomeScreen;

import { StyleSheet } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  image: {
    width: ScreenWidth,
    height: ScreenWidth,
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 20,
  },
});

import { StyleSheet } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export default StyleSheet.create({
  container: {
    width: ScreenWidth - 40,
    flexDirection: 'row',
    gap: 10,
    borderWidth: 1,
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    paddingTop: 10,
  },
  name: {
    fontSize: 20,
  },
  level: {
    fontSize: 14,
  },
  checkBoxContainer: {
    justifyContent: 'center',
  },
});

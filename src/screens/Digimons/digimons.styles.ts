import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  digimonsContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    gap: 20,
    padding: 20,
    marginBottom: 50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  listContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
    marginBottom: 10,
    flex: 1,
  },
});

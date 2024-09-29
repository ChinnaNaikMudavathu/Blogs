import {StyleSheet} from 'react-native/';
import { themeColors } from '../../Themes/index';

const SearchStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,

  },
  searchHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: themeColors.gray,
    borderRadius: 34,
    justifyContent: 'space-between',
  },
  search: {
    padding: 16,
    borderRadius: 34,
    color: themeColors.black,
    fontSize: 16,
  },
});

export default SearchStyles;

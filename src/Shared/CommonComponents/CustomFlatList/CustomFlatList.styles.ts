import {Dimensions, StyleSheet} from 'react-native';
import {themeColors} from '../../Themes/index';

const CustomFlatListStyles = StyleSheet.create({
  mainLoader: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.white,
  },
  paginationLoader: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.7,
    left: Dimensions.get('screen').width * 0.4,
    zIndex: 10,
  },
});

export default CustomFlatListStyles;

import {StyleSheet} from 'react-native';
import { themeColors } from '../../../../Shared/Themes/index';

const BlogDetailsStyles = StyleSheet.create({
  container: {flex: 1, padding: 24},
  blogImage: {width: '100%', height: 300, borderRadius: 24},
  blogAuthor: {fontSize: 18, color: themeColors.black, fontWeight: '600'},
  blogType: {
    fontSize: 18,
    color: themeColors.black,
    fontWeight: '600',
  },
  blogCount: {
    fontSize: 18,
    color: themeColors.black,
    fontWeight: '600',
  },
  blogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.black,
  },
  blogContent: {fontSize: 18, color: themeColors.black, fontWeight: '400'},
  authorInfoContainer: {
    marginVertical: 16,
  }
});

export default BlogDetailsStyles;

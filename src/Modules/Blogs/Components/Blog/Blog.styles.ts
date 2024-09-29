import { StyleSheet } from "react-native";
import { themeColors } from "../../../../Shared/Themes/index";

const BlogStyles = StyleSheet.create({
    blogContentContainer: {
        flexDirection: 'row',
      },
      blogImage: {width: 100, height: 100, borderRadius: 24},
      blogRightContentContainer: {flex: 1},
      blogViewsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
      },
      blogTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: themeColors.black,
      },
      blogAuthor: {fontSize: 10, fontWeight: '500', color: themeColors.black}
});

export default BlogStyles;
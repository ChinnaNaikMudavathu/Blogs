import {View, Text, Image, TouchableOpacity} from 'react-native';
import {BlogProps} from './Blog.models';
import BlogStyles from './Blog.styles';

const Blog = ({
  blogImage,
  blogTitle,
  blogAuthor,
  blogViewsCount,
  blogContentType,
  handleOnPressBlog,
}: BlogProps) => {
  return (
    <TouchableOpacity onPress={handleOnPressBlog}>
      <View style={BlogStyles.blogContentContainer}>
        <Image
          source={{
            uri: blogImage,
            cache: 'only-if-cached',
          }}
          style={BlogStyles.blogImage}
        />

        <View style={BlogStyles.blogRightContentContainer}>
          <View style={BlogStyles.blogViewsContainer}>
            <Text>{`Blog type: ${blogContentType}`}</Text>
            <Text>{`${blogViewsCount} views`}</Text>
          </View>
          <Text style={BlogStyles.blogTitle}>{blogTitle}</Text>
          <Text style={BlogStyles.blogAuthor}>{`Author: ${blogAuthor}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Blog;

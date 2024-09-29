import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {themeColors} from '../../../../Shared/Themes/index';
import {BlogDetailsProps} from './BlogDetails.models';
import BlogDetailsStyles from './BlogDetails.styles';

const BlogDetails = ({route}: BlogDetailsProps) => {
  console.log('routes', route);
  const {
    blogImage = '',
    blogTitle = '',
    blogAuthor = '',
    blogViewsCount = 0,
    blogContentType = '',
    blogContent = '',
  } = route?.params ?? {};
  return (
    <View style={{flex: 1, backgroundColor: themeColors.white}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={BlogDetailsStyles.container}>
        <Image
          source={{
            uri: blogImage,
            cache: 'only-if-cached',
          }}
          style={BlogDetailsStyles.blogImage}
        />

        <View style={BlogDetailsStyles.authorInfoContainer}>
          <Text style={BlogDetailsStyles.blogAuthor}>
            {`Author: ${blogAuthor}`}
          </Text>
          <Text
            style={
              BlogDetailsStyles.blogType
            }>{`Blog type: ${blogContentType}`}</Text>
          <Text
            style={
              BlogDetailsStyles.blogCount
            }>{`${blogViewsCount} views`}</Text>
        </View>
        <Text style={BlogDetailsStyles.blogTitle}>{`Title: ${blogTitle}`}</Text>
        <Text style={BlogDetailsStyles.blogCount}>{blogContent}</Text>
      </ScrollView>
    </View>
  );
};

export default BlogDetails;

import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Search from '../../../Shared/CommonComponents/Search/Search';
import BlogsList from '../Components/BlogsList/BlogsList';
import {BlobsDashboardProps} from './BlobsDashboard.models';
import BlobsDashboardStyles from './BlobsDashboard.styles';

const BlobsDashboard = ({navigation}: BlobsDashboardProps) => {
  const [searchBlogQuery, setSearchBlogQuery] = useState('');
  return (
    <View style={BlobsDashboardStyles.container}>
      <View style={BlobsDashboardStyles.SearchInputContainer}>
        <Search
          onChangeText={setSearchBlogQuery}
          value={searchBlogQuery}
          placeHolder={'Search blogs by name...'}
        />
      </View>
      <BlogsList navigation={navigation} />
    </View>
  );
};

export default BlobsDashboard;

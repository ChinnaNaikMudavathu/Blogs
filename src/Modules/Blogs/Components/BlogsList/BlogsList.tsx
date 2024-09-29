import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import Blog from '../Blog/Blog';
import BlogsData from '../../../../Shared/Constants/MockData/Blogs.json';
import {BlogData, BlogsListProps} from './BlogsList.models';
import {ITEMS_PER_PAGE, ScreenNames} from '../../../../Shared/Constants/index';
import CustomFlatList from '../../../../Shared/CommonComponents/CustomFlatList/CustomFlatList';
import {useFocusEffect} from '@react-navigation/native';
import { fetchBlogsData } from '../../../../Bootstrap/NetworkCalls/index';

const BlogsList = ({navigation}: BlogsListProps) => {
  const [bogs, setBlogs] = useState([]);
  const [initialPageNumber, setInitialPageNumber] = useState<number>(1);
  const [isMainDataLoader, setIsMainDataLoader] = useState(false);
  const [isPaginationDataLoader, setIsPaginationDataLoader] = useState(false);
  const fetchBlogs = async (pageNumber: number, isPagination?: boolean) => {
    try {
      if (isPagination) {
        setIsPaginationDataLoader(true);
      } else {
        setIsMainDataLoader(true);
      }
      const blogsResponse = await fetchBlogsData(pageNumber);
      setBlogs([...bogs, ...blogsResponse]);
      if (pageNumber > 1) {
        setInitialPageNumber(pageNumber);
      }
      if (isPagination) {
        setIsPaginationDataLoader(false);
      } else {
        setIsMainDataLoader(false);
      }
    } catch (e: any) {
      if (isPagination) {
        setIsPaginationDataLoader(false);
      } else {
        setIsMainDataLoader(false);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBlogs(1, false);
    }, []),
  );

  const fetchPaginationData = (pageNumber: number) => {
    fetchBlogs(pageNumber, true);
  };

  const handleOnPressBlog = (blogDetails: BlogData) => {
    navigation.navigate(ScreenNames.BlogDetails, {
      blogImage: blogDetails.image,
      blogTitle: blogDetails.title,
      blogAuthor: blogDetails.author,
      blogId: blogDetails.id,
      blogViewsCount: blogDetails.totalViews,
      blogContentType: blogDetails.contentType,
      blogContent: blogDetails.content,
    });
  };
  const renderBlog = ({item, index}: {item: BlogData; index: number}) => {
    return (
      <View
        style={{marginBottom: 16, marginTop: index === 0 ? 24 : 0}}
        key={item.id}>
        <Blog
          blogImage={item.image}
          blogTitle={item.title}
          blogAuthor={item.author}
          blogId={item.id}
          blogViewsCount={item.totalViews}
          blogContentType={item.contentType}
          handleOnPressBlog={() => {
            handleOnPressBlog(item);
          }}
        />
      </View>
    );
  };

  return (
    <View style={{marginHorizontal: 24, flex: 1}}>
      <CustomFlatList
        data={bogs}
        totalData={BlogsData?.metaData?.totalCount}
        renderItem={renderBlog}
        noDataFoundMessage={
          !isMainDataLoader && !isPaginationDataLoader ? 'No blogs found.' : ''
        }
        isMainDataLoader={isMainDataLoader}
        isPaginationDataLoader={isPaginationDataLoader}
        pageLimit={ITEMS_PER_PAGE}
        fetchData={fetchPaginationData}
        initialPageNumber={initialPageNumber}
      />
    </View>
  );
};

export default BlogsList;

import {createAsyncThunk} from '@reduxjs/toolkit';
import {fetchBlogsData} from '../../NetworkCalls/index';
import {GET_BLOGS_ACTION} from '../Types';

export const fetchBlogsAction = createAsyncThunk(
  GET_BLOGS_ACTION,
  async (pageNumber: number) => {
    try {
      const blogsData = await fetchBlogsData(pageNumber);
      return {blogs: blogsData};
    } catch (error: any) {
      return {
        blogs: [],
      };
    }
  },
);

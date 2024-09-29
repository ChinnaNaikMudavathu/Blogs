import {createSlice} from '@reduxjs/toolkit';
import {fetchBlogsAction} from '../Actions/getBlogs.action';
import {GET_BLOGS_REDUCER} from '../Types';

const initialForecastState = {
  blogs: [],
};

export const getBlogsReducer = createSlice({
  name: GET_BLOGS_REDUCER,
  initialState: initialForecastState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBlogsAction?.fulfilled, (state, action) => {
        return {
          ...state,
          blogs: action?.payload?.blogs ?? [],
        };
      })
      .addCase(fetchBlogsAction.rejected, state => {
        return {
          ...state,
          blogs: [],
        };
      });
  },
});

export default getBlogsReducer.reducer;

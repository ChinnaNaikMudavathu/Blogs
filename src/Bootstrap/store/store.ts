import {configureStore} from '@reduxjs/toolkit';
import getBlogsReducer from './reducers/getBlogs.reducer';

const store = configureStore({
  reducer: {
    blogs: getBlogsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

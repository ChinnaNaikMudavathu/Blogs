import {ITEMS_PER_PAGE} from '../../Shared/Constants/index';
import BlogsData from '../../Shared/Constants/MockData/Blogs.json';

export const fetchBlogsData = async (pageNumber: number) => {
  try {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const blogsStartIndex =
          pageNumber === 1 ? 0 : (pageNumber - 1) * ITEMS_PER_PAGE;
        const blogsEndIndex = ITEMS_PER_PAGE * pageNumber;

        const newBlogs =
          BlogsData?.blogs?.slice(blogsStartIndex, blogsEndIndex) ?? [];
        resolve(newBlogs);
      }, 1000);
    });
  } catch (e: any) {
    return [];
  }
};

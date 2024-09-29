export interface BlogProps {
  blogImage: string;
  blogTitle: string;
  blogAuthor: string;
  blogId: string;
  blogViewsCount: number;
  blogContentType: string;
  blogContent: string;
  handleOnPressBlog: () => void;
}

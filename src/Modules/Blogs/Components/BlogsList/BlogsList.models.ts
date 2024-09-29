import { NavigationProps } from "../../../../Models/Common.models";

export interface BlogsListProps {
    navigation: NavigationProps
}

export interface BlogData {
  id: string;
  title: string;
  author: string;
  date_published: string;
  image: string;
  totalViews: number;
  contentType: string;
  content: string;
}

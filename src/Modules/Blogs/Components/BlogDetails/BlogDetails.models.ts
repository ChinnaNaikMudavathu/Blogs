import {NavigationProps} from '../../../../Models/Common.models';
import { BlogProps } from '../Blog/Blog.models';

interface RouteProps {
  params: BlogProps;
}

export interface BlogDetailsProps {
  navigation: NavigationProps;
  route: RouteProps;
}

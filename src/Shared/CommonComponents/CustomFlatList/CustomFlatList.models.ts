import {ReactElement} from 'react';

export interface CustomFlatListProps {
  isMainDataLoader?: boolean;
  data: any[];
  pageLimit: number;
  renderItem: (itemData: {item: any; index: number}) => void;
  isPaginationDataLoader?: boolean;
  noDataFoundMessage?: string;
  footerComponent?: ReactElement;
  isHorizontal?: boolean;
  setInitialPageNumber?: (pageNumber: number) => void;
  totalData: number;
  fetchData: (pageNumber: number) => void;
  initialPageNumber: number;
}

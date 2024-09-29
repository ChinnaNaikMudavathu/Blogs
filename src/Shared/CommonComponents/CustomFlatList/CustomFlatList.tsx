import {useCallback, useEffect, useRef, useState} from 'react';
import {Text, FlatList, ActivityIndicator, View} from 'react-native';

import {OnEndReachedThreshold} from '../../Constants/index';
import {themeColors} from '../../Themes/index';

import {CustomFlatListProps} from './CustomFlatList.models';

import CustomFlatListStyles from './CustomFlatList.styles';
const CustomFlatList = ({
  isMainDataLoader,
  data,
  pageLimit,
  renderItem,
  isPaginationDataLoader,
  noDataFoundMessage,
  footerComponent,
  isHorizontal,
  setInitialPageNumber,
  totalData,
  fetchData,
}: CustomFlatListProps) => {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (pageNumber > 1) {
      fetchData(pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const onEndReachedCalledDuringMomentum = useRef(true);
  const onEndReached = useCallback(
    ({distanceFromEnd}) => {
      if (distanceFromEnd >= 0) {
        const isLoadMoreData = pageNumber * pageLimit < totalData;
        if (!onEndReachedCalledDuringMomentum.current && isLoadMoreData) {
          setPageNumber(prevPage => prevPage + 1);
          onEndReachedCalledDuringMomentum.current = true;
        }
      }
    },
    [pageLimit, pageNumber, setInitialPageNumber, totalData],
  );

  const EmptyContentMessage = useCallback(() => {
    return (
      <Text key={1} style={{color: themeColors.black}}>
        {noDataFoundMessage}
      </Text>
    );
  }, [noDataFoundMessage]);

  return (
    <View>
      {isMainDataLoader ? (
        <View style={CustomFlatListStyles.mainLoader}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data}
          extraData={data}
          keyExtractor={(item, index) =>
            item?.id ? `${item?.id}-${index}` : index.toString()
          }
          ListEmptyComponent={<EmptyContentMessage />}
          ListFooterComponent={footerComponent ? footerComponent?.() : null}
          maxToRenderPerBatch={pageLimit}
          onEndReached={onEndReached}
          onEndReachedThreshold={OnEndReachedThreshold}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentum.current = false;
          }}
          renderItem={renderItem}
          horizontal={isHorizontal}
          showsVerticalScrollIndicator={false}
        />
      )}

      {isPaginationDataLoader ? (
        <ActivityIndicator
          color={themeColors.red}
          size={'large'}
          style={CustomFlatListStyles.paginationLoader}
        />
      ) : null}
    </View>
  );
};

export default CustomFlatList;

import {useRef} from 'react';
import {TextInput, View} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {themeColors} from '../../Themes/index';
import {SearchProps} from './Search.models';
import SearchStyles from './Search.styles';

const Search = ({
  onChangeText,
  placeHolder = 'Search...',
  value,
}: SearchProps) => {
  const searWeatherRef = useRef(null);

  return (
    <View style={SearchStyles.searchHeaderContainer}>
      <TextInput
        ref={searWeatherRef}
        placeholder={placeHolder}
        placeholderTextColor={themeColors.black}
        onChangeText={text => {
          if (text?.trim()) {
            onChangeText?.(text?.trim());
          }
        }}
        style={SearchStyles.search}
        value={value}
      />
      <AntDesignIcon
        color={themeColors.black}
        size={30}
        onPress={() => {
          searWeatherRef?.current?.clear?.();
          onChangeText?.('');
        }}
        disabled={!value}
        name={'closecircleo'}
        style={{
          alignSelf: 'center',
          marginRight: 6,
          opacity: !value ? 0.5 : 1,
        }}
      />
    </View>
  );
};

export default Search;

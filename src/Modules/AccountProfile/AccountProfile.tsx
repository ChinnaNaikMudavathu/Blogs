import React, {useCallback, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  ASYNC_STORAGE_KEYS,
  removeAsyncStorageItem,
} from '../../Bootstrap/AsyncStorage/index';
import UserContext from '../../Bootstrap/UserContext/UserContext';
import AccountProfileStyles from './Account.styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {themeColors} from '../../Shared/Themes/index';

const AccountProfile = () => {
  const {loggedInUserDetails, fetchLoggedInUserDetails} =
    useContext(UserContext);

  const handleOnPressSignOut = useCallback(async () => {
    await removeAsyncStorageItem(ASYNC_STORAGE_KEYS.userDetails);
    fetchLoggedInUserDetails?.();
  }, []);

  return (
    <View style={AccountProfileStyles.container}>
      <MaterialIcons
        name="account-box"
        size={100}
        style={{alignSelf: 'center'}}
        color={themeColors.black}
      />
      <Text style={AccountProfileStyles.userName}>
        User Name: {loggedInUserDetails?.name}
      </Text>
      <Text style={AccountProfileStyles.userEmail}>
        User Email: {loggedInUserDetails?.email}
      </Text>
      <TouchableOpacity
        style={AccountProfileStyles.signOutButton}
        onPress={handleOnPressSignOut}>
        <Text style={AccountProfileStyles.signOutButtonLabel}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountProfile;

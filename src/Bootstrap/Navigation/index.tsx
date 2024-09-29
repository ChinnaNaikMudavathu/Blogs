import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AccountProfile, BlobsDashboard, BlogDetails} from './Screens/index';
import {BottomTabScreenNames, ScreenNames} from '../../Shared/Constants/index';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignUp from '../../Modules/SignUp/SignUp';
import SignIn from '../../Modules/SignIn/SignIn';
import {ASYNC_STORAGE_KEYS, getAsyncStorageItem} from '../AsyncStorage/index';
import {ActivityIndicator} from 'react-native';
import {isEmpty} from 'lodash';
import UserContext from '../UserContext/UserContext';
import { themeColors } from '../../Shared/Themes/index';

const NonLoggedInStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={ScreenNames.SignIn}
        component={SignIn}
      />
      <Stack.Screen
        name={ScreenNames.SignUp}
        options={{
          headerShown: false,
        }}
        component={SignUp}
      />
    </Stack.Navigator>
  );
};

const BlobDashBoardTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={ScreenNames.BlobsDashboard}
        component={BlobsDashboard}
      />
      <Stack.Screen
        name={ScreenNames.BlogDetails}
        options={({route}) => {
          return {
            headerTitle: route?.params?.blogHeaderTime ?? 'Blog details',
          };
        }}
        component={BlogDetails}
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({});
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);
  const fetchLoggedInUserDetails = async () => {
    setIsLoadingUserDetails(true);
    try {
      const currentlyLoggedInUserDetails = await getAsyncStorageItem(
        ASYNC_STORAGE_KEYS.userDetails,
      );
      setLoggedInUserDetails(currentlyLoggedInUserDetails);
      setIsLoadingUserDetails(false);
    } catch {
      setIsLoadingUserDetails(false);
    }
  };
  useEffect(() => {
    fetchLoggedInUserDetails();
  }, []);

  const renderStack = () => {
    if (!isEmpty(loggedInUserDetails)) {
      return (
        <Tab.Navigator>
          <Tab.Screen
            name={BottomTabScreenNames.Blogs}
            component={BlobDashBoardTab}
            options={{
              headerShown: false,
              tabBarIcon: () => (
                <FoundationIcon name="social-blogger" size={30} color={themeColors.black}/>
              ),
            }}
          />
          <Tab.Screen
            name={BottomTabScreenNames.AccountProfile}
            component={AccountProfile}
            options={{
              headerShown: false,
              tabBarIcon: () => <MaterialIcons name="account-box" size={30} color={themeColors.black}/>,
            }}
          />
        </Tab.Navigator>
      );
    }
    return NonLoggedInStack();
  };

  if (isLoadingUserDetails) {
    return <ActivityIndicator size={'large'} />;
  }
  return (
    <UserContext.Provider
      value={{
        loggedInUserDetails,
        fetchLoggedInUserDetails,
      }}>
      <NavigationContainer>{renderStack()}</NavigationContainer>
    </UserContext.Provider>
  );
};

export default RootNavigation;

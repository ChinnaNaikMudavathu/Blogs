import {isEmpty} from 'lodash';
import {useCallback, useContext, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  ASYNC_STORAGE_KEYS,
  getAsyncStorageItem,
  storeAsyncStorageItem,
} from '../../Bootstrap/AsyncStorage/index';
import UserContext from '../../Bootstrap/UserContext/UserContext';
import {ScreenNames} from '../../Shared/Constants/index';
import {themeColors} from '../../Shared/Themes/index';
import {isValidSingInUserInformation} from '../../Shared/Utils/index';
import {SignInProps} from './SignIn.models';
import SignInStyles from './SignIn.styles';
import {SignedInUserDetails} from '../../Shared/Utils/Utils.models';

const SignIn = ({navigation}: SignInProps) => {
  const {fetchLoggedInUserDetails} = useContext(UserContext);
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [invalidLoginDetails, setUserDataErrors] = useState({
    emailError: '',
    passwordError: '',
    emailNotFound: '',
    invalidPassword: '',
  });

  const handleOnPressSignIn = useCallback(async () => {
    try {
      const validUserDetails = isValidSingInUserInformation(userData);
      if (validUserDetails.isValidUserInformation) {
        setUserDataErrors(prevErrors => {
          return {
            ...prevErrors,
            emailError: '',
            passwordError: '',
          };
        });
        const allUsers = await getAsyncStorageItem(ASYNC_STORAGE_KEYS.users);

        const findCurrentLoginUser = allUsers?.find(
          (user: SignedInUserDetails) =>
            user?.email?.toLowerCase() === userData?.email?.toLowerCase(),
        );
        if (
          !isEmpty(findCurrentLoginUser) &&
          findCurrentLoginUser?.email?.toLowerCase() ===
            userData?.email?.toLowerCase() &&
          findCurrentLoginUser?.password === userData?.password
        ) {
          setUserDataErrors({
            emailError: '',
            passwordError: '',
            emailNotFound: '',
            invalidPassword: '',
          });
          await storeAsyncStorageItem(
            ASYNC_STORAGE_KEYS.userDetails,
            findCurrentLoginUser,
          );
          fetchLoggedInUserDetails?.();
        } else if (
          findCurrentLoginUser?.email?.toLowerCase() !==
          userData?.email?.toLowerCase()
        ) {
          setUserDataErrors(prevErrors => {
            return {
              ...prevErrors,
              emailNotFound: 'User not registered',
              invalidPassword: '',
            };
          });
        } else if (findCurrentLoginUser?.password !== userData?.password) {
          setUserDataErrors(prevErrors => {
            return {
              ...prevErrors,
              invalidPassword: 'Invalid password',
              emailNotFound: '',
            };
          });
        }
      } else {
        setUserDataErrors(prevErrors => {
          return {
            ...prevErrors,
            emailError: validUserDetails?.errors?.emailError ?? '',
            passwordError: validUserDetails?.errors?.passwordError ?? '',
          };
        });
      }
    } catch (e: any) {
      console.log(e);
    }
  }, [userData]);

  const handleOnPressSignUp = useCallback(() => {
    setUserData({
      email: '',
      password: '',
    });
    navigation.navigate(ScreenNames.SignUp);
  }, []);

  return (
    <View style={SignInStyles.container}>
      <View style={SignInStyles.contentContainer}>
        <View style={SignInStyles.inputContainer}>
          <Text style={SignInStyles.inputLabel}>Email:</Text>
          <TextInput
            placeholder="Please enter email"
            style={SignInStyles.inputText}
            value={userData.email}
            onChangeText={text => {
              setUserData(prevData => {
                return {
                  ...prevData,
                  email: text?.trim(),
                };
              });
            }}
            placeholderTextColor={themeColors.black}
          />
          {invalidLoginDetails?.emailError ? (
            <Text style={{color: themeColors.red}}>
              {invalidLoginDetails?.emailError}
            </Text>
          ) : null}
        </View>
        <View style={SignInStyles.inputContainer}>
          <Text style={SignInStyles.inputLabel}>Password:</Text>
          <TextInput
            placeholder="Please enter password"
            style={SignInStyles.inputText}
            value={userData.password}
            onChangeText={text => {
              setUserData(prevData => {
                return {
                  ...prevData,
                  password: text?.trim(),
                };
              });
            }}
            placeholderTextColor={themeColors.black}
          />
          {invalidLoginDetails?.passwordError ? (
            <Text style={{color: themeColors.red}}>
              {invalidLoginDetails?.passwordError}
            </Text>
          ) : null}
        </View>
        {invalidLoginDetails?.emailNotFound ||
        invalidLoginDetails.invalidPassword ? (
          <Text style={{color: themeColors.red, marginBottom: 6}}>
            {invalidLoginDetails?.emailNotFound ||
              invalidLoginDetails.invalidPassword}
          </Text>
        ) : null}
        <View style={SignInStyles.buttonContainer}>
          <TouchableOpacity onPress={handleOnPressSignUp}>
            <Text style={SignInStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleOnPressSignIn}>
            <Text style={SignInStyles.buttonText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

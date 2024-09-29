import {isEmpty} from 'lodash';
import {useCallback, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {
  ASYNC_STORAGE_KEYS,
  getAsyncStorageItem,
  storeAsyncStorageItem,
} from '../../Bootstrap/AsyncStorage/index';
import {ScreenNames} from '../../Shared/Constants/index';
import {themeColors} from '../../Shared/Themes/index';
import {isValidSingUpUserInformation} from '../../Shared/Utils/index';
import {SignUpProps} from './SignUp.models';
import SignUpStyles from './SignUp.styles';

const SignUp = ({navigation}: SignUpProps) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [userDataErrors, setUserDataErrors] = useState({
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleOnPressSignUp = useCallback(async () => {
    const validUserDetails = isValidSingUpUserInformation(userData);
    if (validUserDetails.isValidUserInformation) {
      setUserDataErrors({
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
      });
      setUserData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      const allUsers = await getAsyncStorageItem(ASYNC_STORAGE_KEYS.users);
      await storeAsyncStorageItem(
        ASYNC_STORAGE_KEYS.users,
        !isEmpty(allUsers) ? [...allUsers, userData] : [userData],
      );
      navigation.navigate(ScreenNames.SignIn);
    } else {
      setUserDataErrors(validUserDetails?.errors ?? {});
    }
  }, [userData]);

  return (
    <View style={SignUpStyles.container}>
      <View style={SignUpStyles.contentContainer}>
        <View style={SignUpStyles.inputContainer}>
          <Text style={SignUpStyles.inputLabel}>Name:</Text>
          <TextInput
            placeholder="Please enter your name"
            style={SignUpStyles.inputText}
            onChangeText={text => {
              setUserData(prevData => {
                return {
                  ...prevData,
                  name: text?.trim(),
                };
              });
            }}
            value={userData.name}
          />
          {userDataErrors?.nameError ? (
            <Text style={{color: themeColors.red}}>
              {userDataErrors.nameError}
            </Text>
          ) : null}
        </View>
        <View style={SignUpStyles.inputContainer}>
          <Text style={SignUpStyles.inputLabel}>Email:</Text>
          <TextInput
            placeholder="Please enter email"
            style={SignUpStyles.inputText}
            onChangeText={text => {
              setUserData(prevData => {
                return {
                  ...prevData,
                  email: text?.trim(),
                };
              });
            }}
            value={userData.email}
          />
          {userDataErrors?.emailError ? (
            <Text style={{color: themeColors.red}}>
              {userDataErrors?.emailError}
            </Text>
          ) : null}
        </View>
        <View style={SignUpStyles.inputContainer}>
          <Text style={SignUpStyles.inputLabel}>Password:</Text>
          <TextInput
            placeholder="Please enter password"
            style={SignUpStyles.inputText}
            onChangeText={text => {
              setUserData(prevData => {
                return {
                  ...prevData,
                  password: text?.trim(),
                };
              });
            }}
            value={userData.password}
          />
          {userDataErrors?.passwordError ? (
            <Text style={{color: themeColors.red}}>
              {userDataErrors?.passwordError}
            </Text>
          ) : null}
        </View>
        <View style={SignUpStyles.inputContainer}>
          <Text style={SignUpStyles.inputLabel}>Confirm password:</Text>
          <TextInput
            placeholder="Please enter confirm password"
            style={SignUpStyles.inputText}
            onChangeText={text => {
              setUserData(prevData => {
                return {
                  ...prevData,
                  confirmPassword: text?.trim(),
                };
              });
            }}
            value={userData.confirmPassword}
          />
          {userDataErrors?.confirmPasswordError ? (
            <Text style={{color: themeColors.red}}>
              {userDataErrors.confirmPasswordError}
            </Text>
          ) : null}
        </View>
        <View style={SignUpStyles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.SignIn);
            }}>
            <Text style={SignUpStyles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={SignUpStyles.buttonText}
            onPress={handleOnPressSignUp}>
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

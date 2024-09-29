import {Patterns} from '../Patterns';
import { UserDetails } from './Utils.models';

const isValidName = (name: string) => {
  if (!name?.trim()) {
    return {valid: false, error: 'Name is required'};
  }
  if (!Patterns.OnlyStrings.test(name)) {
    return {valid: false, error: 'Invalid name'};
  }
  return {valid: true, error: ''};
};

const isValidEmail = (email: string) => {
  if (!email?.trim()) {
    return {valid: false, error: 'Email is required'};
  }
  if (!Patterns.Email.test(email)) {
    return {valid: false, error: 'Invalid email'};
  }
  return {valid: true, error: ''};
};

const isValidPassword = (password: string) => {
  if (!password?.trim()) {
    return {valid: false, error: 'Password is required'};
  }
  if (!Patterns.Password.test(password)) {
    return {valid: false, error: 'Invalid password'};
  }
  return {valid: true, error: ''};
};

const isValidConfirmPassword = (confirmPassword: string, password: string) => {
  if (!confirmPassword?.trim()) {
    return {valid: false, error: 'Password is required'};
  }
  if (
    !Patterns.Password.test(confirmPassword) ||
    confirmPassword !== password
  ) {
    return {valid: false, error: 'Invalid confirm password'};
  }
  return {valid: true, error: ''};
};

export const isValidSingUpUserInformation = (userInformation: UserDetails) => {
  const userInformationErrors: {
    nameError?: string;
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
  } = {};
  const nameValidation = isValidName(userInformation.name);
  const emailValidation = isValidEmail(userInformation.email);
  const passwordValidation = isValidPassword(userInformation.password);
  const confirmPasswordValidation = isValidConfirmPassword(
    userInformation.confirmPassword,
    userInformation.password,
  );
  if (!nameValidation.valid) {
    userInformationErrors.nameError = nameValidation.error;
  } else {
    userInformationErrors.nameError = '';
  }

  if (!emailValidation.valid) {
    userInformationErrors.emailError = emailValidation.error;
  } else {
    userInformationErrors.emailError = '';
  }

  if (!passwordValidation.valid) {
    userInformationErrors.passwordError = passwordValidation.error;
  } else {
    userInformationErrors.passwordError = '';
  }

  if (!confirmPasswordValidation.valid) {
    userInformationErrors.confirmPasswordError =
      confirmPasswordValidation.error;
  } else {
    userInformationErrors.confirmPasswordError = '';
  }
  return {
    errors: userInformationErrors,
    isValidUserInformation:
      !userInformationErrors.nameError &&
      !userInformationErrors?.emailError &&
      !userInformationErrors?.passwordError &&
      !userInformationErrors.confirmPasswordError,
  };
};

export const isValidSingInUserInformation = (userInformation: {
  email: string;
  password: string;
}) => {
  const userInformationErrors: {
    emailError?: string;
    passwordError?: string;
  } = {};
  const emailValidation = isValidEmail(userInformation.email);
  const passwordValidation = isValidPassword(userInformation.password);

  if (!emailValidation.valid) {
    userInformationErrors.emailError = emailValidation.error;
  } else {
    userInformationErrors.emailError = '';
  }

  if (!passwordValidation.valid) {
    userInformationErrors.passwordError = passwordValidation.error;
  } else {
    userInformationErrors.passwordError = '';
  }
  return {
    errors: userInformationErrors,
    isValidUserInformation:
      !userInformationErrors?.emailError &&
      !userInformationErrors?.passwordError,
  };
};

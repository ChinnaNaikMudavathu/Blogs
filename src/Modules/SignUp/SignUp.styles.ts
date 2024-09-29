import {StyleSheet} from 'react-native';
import {themeColors} from '../../Shared/Themes/index';

const SignUpStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.white,
    paddingHorizontal: 24,
  },
  contentContainer: {
    borderRadius: 24,
    marginHorizontal: 24,
    padding: 16,
    width: '100%',
    backgroundColor: themeColors.gray,
  },
  inputContainer: {marginBottom: 16},
  inputLabel: {marginBottom: 8, color: themeColors.black},
  inputText: {borderWidth: 0.5, borderRadius: 8, color: themeColors.black},
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {padding: 12, borderWidth: 0.5, borderRadius: 8},
});

export default SignUpStyles;

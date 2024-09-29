import {StyleSheet} from 'react-native';
import {themeColors} from '../../Shared/Themes/index';

const AccountProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.white,
    padding: 24
  },
  userName: {
    fontSize: 16,
    color: themeColors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: themeColors.black,
    fontWeight: '600',
    textAlign: 'center',
  },
  signOutButton: {
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    padding: 16,
    borderWidth: 0.5,
    width: '100%',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 24,
  },
  signOutButtonLabel: {fontSize: 20, color: themeColors.black, fontWeight: '800'}
});

export default AccountProfileStyles;

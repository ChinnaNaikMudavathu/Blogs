/*
 * <copyright company="Argenbright Innovations Lab">
 *        copyright (c) Argenbright Innovations Lab, an Argenbright Holdings Company.  All rights reserved.
 * </copyright>
 */
import {createContext} from 'react';
import {SignedInUserDetails} from '../../Shared/Utils/Utils.models';

export type UserContextType = {
  loggedInUserDetails: SignedInUserDetails | null;
  fetchLoggedInUserDetails?: () => void;
};

const UserContext = createContext<UserContextType>({
  loggedInUserDetails: null,
  fetchLoggedInUserDetails: () => null,
});

export default UserContext;

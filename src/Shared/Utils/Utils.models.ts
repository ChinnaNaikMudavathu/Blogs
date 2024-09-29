export interface UserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignedInUserDetails {
    name: string;
    email: string;
    userId: string;
  }

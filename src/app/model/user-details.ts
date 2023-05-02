export interface UserDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  gender: string;
  city: string;
  state: string;
  pincode: number;
  fullAddress: string;
  password: string;
  profilePicture: string;
  id: string;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
}

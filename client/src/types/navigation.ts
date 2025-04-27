import { NavigationProp, RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthStackNavigation = NavigationProp<AuthStackParamList>;

export type AuthScreenProps = {
  navigation: AuthStackNavigation;
};

export type LoginScreenRouteProp = RouteProp<AuthStackParamList, 'Login'>;
export type RegisterScreenRouteProp = RouteProp<AuthStackParamList, 'Register'>; 
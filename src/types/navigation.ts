import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
//digimonstack
export enum DigimonStackRoutes {
  Digimons = 'Digimons',
  Details = 'Details',
}

export type DigimonStackNavigatorParamList = {
  [DigimonStackRoutes.Digimons]: undefined;
  [DigimonStackRoutes.Details]: { name: string; img: string; level: string };
};

export type DigimonStackNavigationProp = StackNavigationProp<DigimonStackNavigatorParamList>;
export type DigimonStackRouteProp<T extends keyof DigimonStackNavigatorParamList> = RouteProp<
  DigimonStackNavigatorParamList,
  T
>;
//bottomtabstack
export enum BottomTabStackRoutes {
  DigimonStack = 'DigimonStack',
  Home = 'Home',
}

export type BottomTabStackNavigatorParamList = {
  [BottomTabStackRoutes.Home]: undefined;
  [BottomTabStackRoutes.DigimonStack]: { name: string; img: string; level: string };
};

export type BottomTabStackNavigationProp = StackNavigationProp<BottomTabStackNavigatorParamList>;
export type BottomTabStackRouteProp<T extends keyof BottomTabStackNavigatorParamList> = RouteProp<
  BottomTabStackNavigatorParamList,
  T
>;

import React from 'react';
import HomeScreen from '@app/screens/HomeScreen/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import DigimonStack from './DigimonStack';
import { BottomTabStackRoutes } from '@app/types/navigation';

const Tab = createBottomTabNavigator();

const tabOptionsHome = {
  headerShown: false,
  tabBarIcon: ({ color, size }) => <Icon type="material" name="home" color={color} size={size} />,
};

const tabOptionsList = {
  headerShown: false,
  tabBarIcon: ({ color, size }) => <Icon type="material" name="list" color={color} size={size} />,
};

export default function BottomTabStack() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={BottomTabStackRoutes.Home} component={HomeScreen} options={tabOptionsHome} />
      <Tab.Screen name={BottomTabStackRoutes.DigimonStack} component={DigimonStack} options={tabOptionsList} />
    </Tab.Navigator>
  );
}

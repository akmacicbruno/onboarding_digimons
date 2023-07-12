import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabStack from '@app/navigation/BottomTabStack';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RootStack" component={BottomTabStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

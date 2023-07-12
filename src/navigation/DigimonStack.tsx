import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Digimons from '@app/screens/Digimons';
import Details from '@app/screens/DigimonDetails';
import { DigimonStackNavigatorParamList, DigimonStackRoutes } from '@app/types/navigation';

const Stack = createStackNavigator<DigimonStackNavigatorParamList>();

const DigimonStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={DigimonStackRoutes.Digimons} component={Digimons} />
      <Stack.Screen name={DigimonStackRoutes.Details} component={Details} />
    </Stack.Navigator>
  );
};

export default DigimonStack;

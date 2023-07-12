import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import digimonDetailsStyles from '@app/screens/DigimonDetails/DigimonDetails.styles';
import { useRoute } from '@react-navigation/native';
import { DigimonStackRoutes, DigimonStackRouteProp } from '@app/types/navigation';

const Details = () => {
  const route = useRoute<DigimonStackRouteProp<DigimonStackRoutes.Details>>();
  const { name, img, level } = route.params;

  useEffect(() => {
    return () => {
      console.log('Digimon name: ' + name);
      console.log('Date: ' + new Date().toLocaleDateString());
    };
  }, [name]);

  return (
    <View style={digimonDetailsStyles.container}>
      <Image source={{ uri: img }} style={digimonDetailsStyles.image} />
      <Text style={digimonDetailsStyles.name}>{name}</Text>
      <Text style={digimonDetailsStyles.level}>{level}</Text>
    </View>
  );
};

export default Details;

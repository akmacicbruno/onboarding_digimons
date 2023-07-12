import React, { useMemo } from 'react';
import { View, Image, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';
import digimonStyles from '@app/components/Digimon/digimon.styles';

interface DigimonProps {
  img: string;
  name: string;
  level: string;
  isChecked: boolean;
  onCheckboxChange: (value: boolean) => void;
}

const Digimon: React.FC<DigimonProps> = ({ img, name, level, isChecked, onCheckboxChange }) => {
  const onCheckBoxToggle = () => {
    onCheckboxChange(!isChecked);
  };

  const getRandomColor = () => {
    // Generiranje slučajne boje u formatu #RRGGBB
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const itemCheckedStyle = {
    ...digimonStyles.container,
    backgroundColor: '#c7c7c7',
  };

  const itemStyle = useMemo(() => {
    return {
      ...digimonStyles.container,
      borderColor: getRandomColor(),
    };
  }, []);

  return (
    <View style={isChecked ? itemCheckedStyle : itemStyle}>
      <View>
        <Image source={{ uri: img }} style={digimonStyles.image} />
      </View>
      <View style={digimonStyles.info}>
        <View style={digimonStyles.textContainer}>
          <Text style={digimonStyles.name}>{name}</Text>
          <Text style={digimonStyles.level}>{level}</Text>
        </View>
        <View style={digimonStyles.checkBoxContainer}>
          <CheckBox
            checked={isChecked}
            onPress={onCheckBoxToggle}
            iconType="material"
            checkedIcon="check-circle"
            uncheckedIcon="radio-button-unchecked"
            checkedColor="blue"
          />
        </View>
      </View>
    </View>
  );
};

export default Digimon;

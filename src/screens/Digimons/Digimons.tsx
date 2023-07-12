import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, RefreshControl, TextInput, TouchableOpacity, ListRenderItem } from 'react-native';
import Digimon from '@app/components/Digimon/Digimon';
import { Icon } from 'react-native-elements';
import { throttle, debounce } from '@app/functions/debounceThrottle';
import Style from '@app/screens/Digimons/Digimons.styles';
import { DigimonStackNavigationProp, DigimonStackRoutes } from '@app/types/navigation';
import { useNavigation } from '@react-navigation/native';
import Loading from '@app/components/Loading/Loading';

interface IDigimonProps {
  img: string;
  name: string;
  level: string;
  isChecked: boolean;
}

const Digimons = () => {
  const navigation = useNavigation<DigimonStackNavigationProp>();
  const [digimonData, setDigimonData] = useState<IDigimonProps[]>([]);
  const [digimonDataFiltered, setDigimonDataFiltered] = useState<IDigimonProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(null);
  const [searchName, setSearchName] = useState('');
  const [searchLevel, setSearchLevel] = useState('');

  const keyExtractor = (item: IDigimonProps) => item.name;

  useEffect(() => {
    fetchDigimonData();
  }, []);

  const fetchDigimonData = async () => {
    try {
      const response = await fetch('https://digimon-api.vercel.app/api/digimon');
      const data = await response.json();
      setDigimonData(data);
      setIsLoading(false);
    } catch (error) {
      console.log('Error:', error);
      setMessage(error);
      setIsLoading(false);
    }
  };

  const handleSearchName = (name: string) => {
    setSearchName(name);
    filteredDataName();
  };

  const handleSearchLevel = (level: string) => {
    setSearchLevel(level);
    filteredDataLevel();
  };

  const filteredDataName = throttle(() => {
    const filteredDigimonsName = digimonData.filter(item => item.name.toLowerCase().includes(searchName.toLowerCase()));
    setDigimonDataFiltered(filteredDigimonsName);
  }, 500);

  const filteredDataLevel = debounce(() => {
    const filteredDigimonsLevel = digimonData.filter(item =>
      item.level.toLowerCase().includes(searchLevel.toLowerCase()),
    );
    setDigimonDataFiltered(filteredDigimonsLevel);
  }, 500);

  const handleItemPress = useCallback(
    (name: string, img: string, level: string) => {
      const updatedData = digimonData.map(item => {
        if (item.name === name) {
          return {
            ...item,
            isChecked: true,
          };
        }
        return item;
      });

      setDigimonData(updatedData);
      navigation.navigate(DigimonStackRoutes.Details, { name, img, level });
    },
    [digimonData, navigation],
  );

  const renderItem: ListRenderItem<IDigimonProps> = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => handleItemPress(item.name, item.img, item.level)}>
        <Digimon
          img={item.img}
          name={item.name}
          level={item.level}
          isChecked={item.isChecked}
          onCheckboxChange={isChecked => handleCheckboxChange(item.name, isChecked)}
        />
      </TouchableOpacity>
    ),
    [handleItemPress],
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchDigimonData();
    setRefreshing(false);
  }, []);

  const handleCheckboxChange = (name: string, isChecked: boolean) => {
    setDigimonData(prevState => prevState.map(item => (item.name === name ? { ...item, isChecked } : item)));
  };

  const sortData = useCallback(() => {
    const sortedData = [...digimonData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setDigimonData(sortedData);
  }, [digimonData, sortOrder]);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    sortData();
  }, [sortData]);

  return (
    <View style={Style.digimonsContainer}>
      <View>
        {isLoading ? null : (
          <View style={Style.header}>
            <Text style={Style.title}>Digimon List</Text>
            {sortOrder === 'desc' ? (
              <TouchableOpacity style={Style.iconContainer} onPress={toggleSortOrder}>
                <Text>Sort by ASC</Text>
                <Icon type="material" name="arrow-drop-up" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={Style.iconContainer} onPress={toggleSortOrder}>
                <Text>Sort by DSC</Text>
                <Icon type="material" name="arrow-drop-down" />
              </TouchableOpacity>
            )}
          </View>
        )}
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder="Search by name"
            value={searchName}
            onChangeText={handleSearchName}
          />
          <TextInput
            style={Style.input}
            placeholder="Search by level"
            value={searchLevel}
            onChangeText={handleSearchLevel}
          />
        </View>
        <FlatList
          data={searchName || searchLevel ? digimonDataFiltered : digimonData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={Style.listContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          ListEmptyComponent={<Loading isLoading={isLoading} message={message} />}
          maxToRenderPerBatch={10}
          initialNumToRender={7}
        />
      </View>
    </View>
  );
};

export default Digimons;

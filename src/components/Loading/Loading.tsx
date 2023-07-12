import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Style from '@app/components/Loading/Loading.styles';

const Loading = props => {
  const { isLoading } = props;
  const { message } = props;
  return (
    <View>
      {isLoading ? (
        <View style={Style.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View style={Style.emptyContainer}>{message ? <Text>{message}</Text> : <Text>Empty list.</Text>}</View>
      )}
    </View>
  );
};

export default Loading;

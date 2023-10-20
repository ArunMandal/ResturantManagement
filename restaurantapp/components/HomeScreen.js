// HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import ListFoods from './ListFoods';
import DailyNotes from './DailyNotes';

const HomeScreen = () => {
  return (
    <View>
      <Text>Welcome to the Home Screen</Text>
      <ListFoods />
      <DailyNotes />
    </View>
  );
};

export default HomeScreen;




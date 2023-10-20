import React from 'react';
import { View } from 'react-native';
import ListFoods from './components/ListFoods';
import DailyNotes from './components/DailyNotes';
import PersonalProfile from './components/PersonalProfile';

const App = () => {
  return (
    <View>
      <ListFoods />
      <DailyNotes />
      <PersonalProfile />
    </View>
  );
};

export default App;

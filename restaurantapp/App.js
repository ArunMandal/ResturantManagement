import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './layout/tabNav/tab';
import GlobalContext from './contex';


const App = () => {

  const [state,setState]= useState({food:[],notes:[]});
  return (
    <GlobalContext.Provider value={{state,setState}}>
      <NavigationContainer >
        <TabNavigator  />
      </NavigationContainer>

    </GlobalContext.Provider>
  );
};

export default App;

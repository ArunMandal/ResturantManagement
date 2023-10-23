import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FoodStackNavigator from '../stackNav/FoodStack';
import NoteStackNavigator from '../stackNav/NoteStack';
import ProfileStackNavigator from '../stackNav/ProfileStack';
import CartStack from '../stackNav/CartStack';

import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="foodList"
        component={FoodStackNavigator}
        options={{
          tabBarLabel: 'Food',
          tabBarIcon: ({ color }) => (
            <Icon name="fast-food-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="dailyNotes"
        component={NoteStackNavigator}
        options={{
          tabBarLabel: 'Notes',
          tabBarIcon: ({ color }) => (
            <Icon name="reader-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="personalProfile"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartStack}
        options={{
          tabBarLabel: 'Order', // Updated the label to 'Cart'
          tabBarIcon: ({ color }) => (
            <Icon name="cart-outline" size={25} color={color} /> // Updated the icon name to 'cart-outline'
          ),
        }}
      />
    </Tab.Navigator>
  );
}


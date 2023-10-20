import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Food from './Food';

const foodData = [
  {
    id: '1',
    name: 'Noodle',
    price: 10,
    origin: 'Vietnam',
    date: new Date(),
    image: 'vetnam.jpg',
  },
  // Add more food items here
];

const ListFoods = () => {
  return (
    <View>
      <Text>List of Foods</Text>
      <FlatList
        data={foodData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Food
            name={item.name}
            price={item.price}
            origin={item.origin}
            date={item.date}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

export default ListFoods;


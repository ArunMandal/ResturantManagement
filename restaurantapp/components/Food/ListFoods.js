import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import Food from './Food';
import getFood from '../../network';
import GlobalContext from '../../contex';


export default function ListFoods() {
  const { state, setState } = useContext(GlobalContext);
  const [food, setFood] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        let data = await getFood("token");
        setState({ ...state, food: data.foods })
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getCourse();
  
  }, [])

  useEffect(() => {
    setFood(state.food)
  }, [state.food])

  return (
    <View>
      <Text>List of Foods</Text>
      <FlatList
        data={food}
        keyExtractor={(item) => item._id}
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
}







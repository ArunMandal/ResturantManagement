import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput } from 'react-native';
import Food from './Food';
import getFood from '../../network';
import GlobalContext from '../../contex';
import { TouchableHighlight } from 'react-native-gesture-handler';


export default function ListFoods({ navigation }) {
  const { state, setState } = useContext(GlobalContext);
  const [food, setFood] = useState([]);
  const [searchText, setSearchText] = useState("");

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


  const changeSearch = text => {
    setSearchText(text);
    if (text !== "") {
      let result = [...state.food];
      const filteredFood = result.filter(food => {
        return food.name.toLowerCase().includes(text.toLowerCase());
      });
      setFood(filteredFood);
    } else {
      setFood(state.food);
    }
  }

  const addFood = () => {

    navigation.navigate('addFood')
  }


  return (
    <View style={{flex:1, flexDirection:"column", justifyContent:"center",alignItems:'center'}}>
      <Text>List of Foods</Text>

      <TouchableHighlight onPress={addFood}>
        <Text> Add new food </Text>
      </TouchableHighlight>

      <TextInput placeholder='Live Search' onChangeText={changeSearch} />
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
            _id={item._id}
          />
        )}
      />
    </View>
  );
}







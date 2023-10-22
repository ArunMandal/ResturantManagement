import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Food from './Food';
import { getFood } from '../../network';
import GlobalContext from '../../contex';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ListFoods({ navigation }) {
  const { state, setState } = useContext(GlobalContext);
  const [food, setFood] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getFoodfromDB = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        let data = await getFood(storedToken);
        setState({ ...state, food: data.foods });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getFoodfromDB();
  }, []);

  useEffect(() => {
    setFood(state.food);
  }, [state.food]);

  const changeSearch = (text) => {
    setSearchText(text);
    if (text !== "") {
      let result = [...state.food];
      const filteredFood = result.filter((food) => {
        return food.name.toLowerCase().includes(text.toLowerCase());
      });
      setFood(filteredFood);
    } else {
      setFood(state.food);
    }
  };

  const addFood = () => {
    navigation.navigate('addFood');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>List of Foods</Text>

      <TouchableOpacity style={styles.addButton} onPress={addFood}>
        <Text style={styles.buttonText}>Add new food</Text>
      </TouchableOpacity>

      <TextInput style={styles.searchInput} placeholder="Live Search" onChangeText={changeSearch} />
      <FlatList style={{width:"50%"}}
        data={food}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Food name={item.name} price={item.price} origin={item.origin} date={item.date} image={item.image} _id={item._id} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //padding: 20,
    width:'100%'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#ff9900',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});

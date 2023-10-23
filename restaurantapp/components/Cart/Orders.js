import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
//import Food from './Food';

import { getFood } from '../../network';
import GlobalContext from '../../contex';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartItem from './CartItem';
import OrderItem from './orderItem';

export default function orders({ navigation }) {
  const { state, setState } = useContext(GlobalContext);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const getOrdersfromDB = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        let data = await getFood(storedToken);
        console.log("data",data.order)
        setState({ ...state, orders: data.order });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getOrdersfromDB();
  }, []);

  useEffect(() => {
    setOrders(state.orders);
  }, [state.orders]);

  // const changeSearch = (text) => {
  //   setSearchText(text);
  //   if (text !== "") {
  //     let result = [...state.food];
  //     const filteredFood = result.filter((food) => {
  //       return food.name.toLowerCase().includes(text.toLowerCase());
  //     });
  //     setFood(filteredFood);
  //   } else {
  //     setFood(state.food);
  //   }
  // };



  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Items in Cart to checkout</Text>

      <FlatList style={{ width: "100%" }}
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <OrderItem name={item.name} price={item.price} origin={item.origin} date={item.date} image={item.image} _id={item._id} />
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
    width: '100%'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    marginLeft: 20
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
    //padding: 10,
    marginBottom: 20,
    width: '100%',
  },
});
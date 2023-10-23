import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { addOrder } from '../../network'; // Import the addOrder function
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddOrderComponent = ({ restaurantId, token }) => {
  const [order, setOrder] = useState({
    foods: '', // Initialize as an empty string
    totalAmount: '', // Initialize as an empty string
    quantity: '', // Initialize as an empty string
    orderDate: new Date().toISOString(), // Include the current date
  });

  const handleAddOrder = async () => {
    if (order.foods.trim() === '' || order.totalAmount.trim() === '' || order.quantity.trim() === '') {
      alert('Please enter food items, quantity, and total amount for your order.');
      return;
    }
    const token = await AsyncStorage.getItem('token');
    console.log("token", token);

    const result = await addOrder(order, token);
    if (result.success) {
      alert('Order added successfully.');
      setOrder({
        foods: '', // Clear the foods input
        totalAmount: '', // Clear the total amount input
        quantity: '', // Clear the quantity input
        orderDate: new Date().toISOString(), // Update the date to the current date
      });
    } else {
      alert('Error adding order: ' + result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Order Details:</Text>
      {/* Allow the user to input selected food items */}
      <TextInput
        style={styles.input}
        value={order.foods}
        onChangeText={(text) => setOrder({ ...order, foods: text })}
        placeholder="Enter Food Items"
      />
      {/* Allow the user to input the quantity */}
      <TextInput
        style={styles.input}
        value={order.quantity}
        onChangeText={(text) => setOrder({ ...order, quantity: text })}
        placeholder="Enter Quantity"
      />
      {/* Allow the user to input the total amount */}
      <TextInput
        style={styles.input}
        value={order.totalAmount}
        onChangeText={(text) => setOrder({ ...order, totalAmount: text })}
        placeholder="Enter Total Amount"
      />
      <Text>Order Date: {new Date(order.orderDate).toLocaleString()}</Text>

      <Button title="Add Order" onPress={handleAddOrder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
});

export default AddOrderComponent;





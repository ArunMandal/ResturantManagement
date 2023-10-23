import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { addToCart } from '../../network'; // Import the addToCart function

const AddToCartComponent = ({ restaurantId, foodId, token }) => {
  const handleAddToCart = async () => {
    const result = await addToCart(restaurantId, foodId, token);
    if (result.success) {
      alert('Food added to cart successfully.');
    } else {
      alert('Error adding to cart: ' + result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Add to Cart" onPress={handleAddToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default AddToCartComponent;


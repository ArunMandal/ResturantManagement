import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { checkoutCart } from '../../network'; // Import the checkoutCart function

const CheckoutCartComponent = ({ restaurantId, token }) => {
  const handleCheckoutCart = async () => {
    const result = await checkoutCart(restaurantId, token);
    if (result.success) {
      alert('Cart checked out successfully.');
    } else {
      alert('Error checking out cart: ' + result.error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Checkout Cart" onPress={handleCheckoutCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default CheckoutCartComponent;


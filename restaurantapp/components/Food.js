import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Food = ({ name, price, origin, date, image }) => {
  return (
    <View style={styles.foodContainer}>
      <Image source={require(`../images/${image}`)} style={styles.foodImage} />
      <View style={styles.foodDetails}>
        <Text style={styles.foodName}>{name}</Text>
        <Text style={styles.foodOrigin}>Origin: {origin}</Text>
        <Text style={styles.foodPrice}>Price: ${price}</Text>
        <Text style={styles.foodDate}>Date: {date.toDateString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  foodContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  foodImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  foodOrigin: {
    fontSize: 14,
    color: '#777',
  },
  foodPrice: {
    fontSize: 16,
    color: '#333',
  },
  foodDate: {
    fontSize: 14,
    color: '#555',
  },
});

export default Food;

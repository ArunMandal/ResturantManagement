import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { deleteFood } from '../../network';
import GlobalContext from '../../contex';
import { getFood } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Food = ({ _id, name, price, origin, date, image }) => {

  const navigation = useNavigation();
  const { state, setState } = useContext(GlobalContext)

  const getFoodfromDB = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      let data = await getFood(storedToken);
      setState({ ...state, food: data.foods })
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const viewfood = () => {

    navigation.navigate('foodDetals', { name, price, origin, date, image })
  }

  const editFood = () => {

    navigation.navigate('editFood', { _id, name, price, origin, date, image })
  }


  const toDeleteFood = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    const success = await deleteFood(_id, storedToken);
    if (success) {
      console.log("Food deleted successfully");
      getFoodfromDB();
      navigation.navigate('foodList');
    } else {
      console.log("food deletion failed");
    }
  };



  const toDelete = () => {
    if (Platform.OS === 'web') {
      const userConfirmed = confirm('Do you want to delete this food?');
      if (userConfirmed) {
        toDeleteFood();
      }
    } else {
      Alert.alert('Do you want to delete this food?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        {
          text: 'OK',
          onPress: () => toDeleteFood()
        },
      ]);
    }
  };

  return (
    <View style={styles.foodContainer}>
      {/* <Image source={require(`../../images/${image}`)} style={styles.foodImage} /> */}


      <View style={styles.foodDetails}>
        {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        <Text style={styles.foodName}>{name}</Text>

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
          <Text style={styles.foodOrigin}>Origin: {origin}</Text>
          <Text style={styles.foodPrice}>Price: ${price}</Text>
        </View>

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableHighlight onPress={editFood}>
            <Text >Edit</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={viewfood}>
            <Text >View</Text>
          </TouchableHighlight>

          <TouchableHighlight onPress={toDelete}>
            <Text >Delete</Text>
          </TouchableHighlight>

        </View>

        {/* <Text style={styles.foodDate}>Date: {date.toDateString()}</Text> */}
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
    textAlign: "center"
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

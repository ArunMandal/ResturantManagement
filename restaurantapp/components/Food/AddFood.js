import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { addFood } from '../../network';
// import DatePicker from 'react-native-datepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GlobalContext from '../../contex';

import { getFood } from '../../network';



const AddFood = ({ navigation }) => {

    const { state, setState } = useContext(GlobalContext)
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);


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


    const handleImageSelection = async () => {
        try {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (permissionResult.granted === false) {
                alert('Permission to access camera roll is required!');
                return;
            }

            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                aspect: [4, 3]
            })
            console.log("ret.assets[0].uri", pickerResult.assets[0].uri); // log the result for debugging
            if (pickerResult.cancelled === true) {
                return;
            }

            setImage(pickerResult.uri);
        } catch (error) {
            console.error('Error picking image: ', error);
        }
    };


    const handleDateChange = (event, selectedDate) => {
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0];
            setDate(formattedDate);
        }
    };

    const handleSubmit = async () => {
        // Handle form submission here

        // Get today's date
        let today = new Date();

        // Extract the day, month, and year
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();
        let formattedDate = mm + '/' + dd + '/' + yyyy;
        const storedToken = await AsyncStorage.getItem('token');
        const newFood = {
            name: name,
            origin: origin,
            price: price,
            date: formattedDate,
            image: image
        }

        const ret = await addFood(newFood, storedToken)

        if (ret.success) {

            getFoodfromDB();
            navigation.navigate('foodList')
        }
        else {
            console.log(ret.message);
        }


    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Food</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Origin"
                    value={origin}
                    onChangeText={(text) => setOrigin(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    keyboardType="numeric"
                />
            </View>
            <Button style={{ margin: 10 }} title="Select Image" onPress={handleImageSelection} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    formContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 12,
        marginBottom: 20,
        width: '80%',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    buttonContainer: {
        width: 'auto',
        marginTop: 20
    },
});

export default AddFood;

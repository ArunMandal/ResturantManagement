import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
 import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { addFood } from '../../network';
// import DatePicker from 'react-native-datepicker';

const AddFood = () => {
    const [name, setName] = useState('');
    const [origin, setOrigin] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState(new Date());
    const [image, setImage] = useState(null);



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

    const handleSubmit = () => {
        // Handle form submission here


        const newFood = {
            name: name,
            origin: origin,
            price: price,
            date: date.toISOString().split('T')[0],
            image: image
        }

        const ret = addFood(newFood, "token")

        console.log("ret", ret)



    };

    return (
        <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                placeholder="Origin"
                value={origin}
                onChangeText={(text) => setOrigin(text)}
            />

            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={(text) => setPrice(text)}
                keyboardType="numeric"
            />
            <DatePicker selected={date} onChange={(text) => setDate(text)} />
            {/* <DatePicker selected={date} onChange={handleDateChange} />  */}

           


            <Button title="Select Image" onPress={handleImageSelection} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default AddFood;

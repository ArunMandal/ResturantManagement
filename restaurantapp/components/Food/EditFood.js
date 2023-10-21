import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import DatePicker from "react-datepicker";
import DatePicker from 'react-native-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { editFood } from '../../network';



export default function EditFood({ navigation, route }) {

    console.log(route.params);

    const [name, setName] = useState(route.params.name);
    const [origin, setOrigin] = useState(route.params.origin);
    const [price, setPrice] = useState(route.params.price);
    const [date, setDate] = useState(route.params.date);
    const [image, setImage] = useState(route.params.image);



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

    const handleSubmit = () => {
        // Handle form submission here

        const newFood = {
            name: name,
            origin: origin,
            price: price,
            date: date,
            image: image,
            _id: route.params._id
        }

        const ret = editFood(newFood, "token")

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
            {/* <DatePicker selected={date} mode="date" format="YYYY-MM-DD" onChange={(text) => setDate(text)} /> */}

            <DatePicker
                date={date}
                mode="date"
                format="YYYY-MM-DD"
                onDateChange={(newDate) => setDate(newDate)}
            />

            <Button title="Select Image" onPress={handleImageSelection} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}


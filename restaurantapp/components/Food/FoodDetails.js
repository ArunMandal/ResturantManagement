import { Text, View, Button,Image } from "react-native"
import * as ImagePicker from 'expo-image-picker';
import DatePicker from "react-datepicker";

export default function FoodDetails({ navigation, route }) {

    const { name, price, origin, date, image } = route.params;

    console.log(route.params);
    return (
        <View style={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
            <Text>Name: {name}</Text>
            <Text>Price:{price}</Text>
            <Text>Origin:{origin}</Text>
            <Text> Date:{date}</Text>
            {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
            <Button title="Back" onPress={() => navigation.goBack()} />
        </View>
    );
}
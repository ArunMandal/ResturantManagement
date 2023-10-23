import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addNotes } from '../../network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GlobalContext from '../../contex';
import { getNotes } from '../../network';


const AddNotes = ({ navigation }) => {
    const { state, setState } = useContext(GlobalContext)
    const [header, setHeader] = useState('');
    const [comment, setComment] = useState('');

    const getNotesfromDB = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('token');
            let data = await getNotes(storedToken);
            setState({ ...state, notes: data.notes })
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    const handleSubmit = async () => {

        let today = new Date();

        // Extract the day, month, and year
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        let yyyy = today.getFullYear();
        let formattedDate = mm + '/' + dd + '/' + yyyy;
        const storedToken = await AsyncStorage.getItem('token');
        const newNote = {
            header: header,
            comment: comment,
            date: formattedDate,
        }

        const ret = await addNotes(newNote, storedToken)

        if (ret.success) {
            getNotesfromDB();
            navigation.navigate('noteList')
        }
        else {
            console.log(ret.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Note</Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Header"
                    value={header}
                    onChangeText={(text) => setHeader(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Comment"
                    value={comment}
                    multiline
                    numberOfLines={4}
                    onChangeText={(text) => setComment(text)}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        justifyContent: 'center',
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
        width: '10%',
        marginTop: 20
    },
});

export default AddNotes;

import React, { useState, useEffect,useContext } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet } from 'react-native';
import GlobalContext from '../../contex';

import { getUser } from '../../network';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const PersonalProfile = () => {
  const {state,setState}=useContext(GlobalContext);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const id = "65345dafa7e75248f6c1dd5a";
  const { email, fullName, phoneNumber, address } = user;
  const navigation = useNavigation();

  const fetchData = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    setToken(storedToken);

    console.log('user info')
    console.log("id",id)
    console.log("token",storedToken)

    const userProfileResponse = await getUser(id, storedToken);

    if (userProfileResponse.success) {
      const userProfile = userProfileResponse.data.user;
      setUser(userProfile);
    } else {
      Alert.alert(`Error: ${userProfileResponse.error}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    setUser({});
    setToken(null);
    setState({...state,user:false})
    //navigation.navigate('AuthScreen');
  };
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Information</Text>
      <Image source={require(`../../images/sam.jpg`)} style={styles.userPhoto} />
      <Text style={styles.label}>Email: {email}</Text>
      <Text style={styles.label}>Full Name: {fullName}</Text>
      <Text style={styles.label}>Phone Number: {phoneNumber}</Text>
      <Text style={styles.label}>Address: {address}</Text>
      <Button title="Update Profile" onPress={() => navigation.navigate('updateProfile', { setUser: setUser })
} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userPhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
});

export default PersonalProfile;







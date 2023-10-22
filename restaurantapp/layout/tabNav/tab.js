import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FoodStackNavigator from '../stackNav/foodStack';
import NoteStackNavigator from '../stackNav/noteStack';
import ProfileStackNavigator from '../stackNav/profileStack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library


const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'foodList') {
                        iconName = 'cutlery'; // Example icon name
                    } else if (route.name === 'dailyNotes') {
                        iconName = 'sticky-note'; // Example icon name
                    } else if (route.name === 'personal profile') {
                        iconName = 'user'; // Example icon name
                    }

                    // You can return any component that you like here
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen name="foodList" component={FoodStackNavigator} />
            <Tab.Screen name="dailyNotes" component={NoteStackNavigator} />
            <Tab.Screen name="personal profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    )

}



import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FoodStackNavigator from '../stackNav/foodStack';
import NoteStackNavigator from '../stackNav/noteStack';
import ProfileStackNavigator from '../stackNav/profileStack';
import Icon from 'react-native-vector-icons/FontAwesome'; // Replace with the appropriate icon library


const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator activeColor="#f0edf6" inactiveColor="black" barStyle={{ backgroundColor: 'lightgreen' }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    let iconColor = 'black'; // Set your desired color here
                    let iconSize = 24; // Set your desired size here

                    if (route.name === 'foodList') {
                        iconName = 'cutlery'; // Example icon name
                    } else if (route.name === 'dailyNotes') {
                        iconName = 'sticky-note'; // Example icon name
                    } else if (route.name === 'personal profile') {
                        iconName = 'user'; // Example icon name
                    }

                    // You can return any component that you like here
                    return <Icon name={iconName} size={iconSize} color={iconColor} />;
                },
                // tabBarLabel: ({ focused, color }) => {
                //     let fontSize =  14 ; 
                //     let tcolor="red"// Adjust the font size based on focus
                //     let label;

                //     if (route.name === 'foodList') {
                //         label = 'Food';
                //     } else if (route.name === 'dailyNotes') {
                //         label = 'Daily Notes';
                //     } else if (route.name === 'personal profile') {
                //         label = 'Profile';
                //     }

                //     return <Text style={{ fontSize, tcolor }}>{label}</Text>;
                // },
            })}

        >
            {/* Your Tab.Screen components here */}
            <Tab.Screen name="foodList" component={FoodStackNavigator} options={{title:"Food"}}/>
            <Tab.Screen name="dailyNotes" component={NoteStackNavigator} options={{title:"Notes"}} />
            <Tab.Screen name="personal profile" component={ProfileStackNavigator} options={{title:"Profile"}}/>
        </Tab.Navigator>
    )

}



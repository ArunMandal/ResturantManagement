import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import FoodStackNavigator from '../stackNav/foodStack';
import NoteStackNavigator from '../stackNav/noteStack';
import ProfileStackNavigator from '../stackNav/profileStack';

const Tab = createMaterialBottomTabNavigator();


export default function TabNavigator() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="foodList" component={FoodStackNavigator} />
            <Tab.Screen name="dailyNotes" component={NoteStackNavigator} />
            <Tab.Screen name="personal profile" component={ProfileStackNavigator} />
        </Tab.Navigator>

    )

}



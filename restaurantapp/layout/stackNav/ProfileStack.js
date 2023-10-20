import { createStackNavigator } from '@react-navigation/stack';
import PersonalProfile from '../../components/profile/PersonalProfile';
import EditProfile from '../../components/profile/EditProfile';


const stack = createStackNavigator();

export default function ProfileStackNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen name='userProfile' component={PersonalProfile} />
            <stack.Screen name='editProfile' component={EditProfile} />
        </stack.Navigator>
    )
}


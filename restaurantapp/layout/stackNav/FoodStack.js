import { createStackNavigator } from '@react-navigation/stack';
import ListFoods from '../../components/Food/ListFoods';
import FoodDetails from '../../components/Food/FoodDetails';
import AddFood from '../../components/Food/AddFood';
import EditFood from '../../components/Food/EditFood';



const stack = createStackNavigator();

export default function FoodStackNavigator() {

    return (

        <stack.Navigator>
            <stack.Screen name='foodList' component={ListFoods} />
            <stack.Screen name='foodDetals' component={FoodDetails} />
            <stack.Screen name='addFood' component={AddFood} />
            <stack.Screen name='editFood' component={EditFood} />
        </stack.Navigator>
    )

}


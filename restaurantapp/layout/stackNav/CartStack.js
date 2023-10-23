import { createStackNavigator } from '@react-navigation/stack';

import { useState } from 'react';
import Cart from '../../components/Cart/Cart';

const stack = createStackNavigator();

export default function CartStackNavigator() {
    return (
        <stack.Navigator>
            <stack.Screen name='cart' component={Cart} options={{headerShown:false}}/>
            
        </stack.Navigator>
    )

}


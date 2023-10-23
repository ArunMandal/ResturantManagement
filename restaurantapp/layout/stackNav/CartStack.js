// Remove the NavigationContainer from CartStack
import { createStackNavigator } from '@react-navigation/stack';
import AddToCartComponent from '../../components/Orders/AddToCart';
import CheckoutComponent from '../../components/Orders/CheckoutCart';
import AddOrderComponent from '../../components/Orders/AddOrder';

const Stack = createStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator initialRouteName="AddOrder">
      <Stack.Screen name="AddOrder" component={AddOrderComponent} />
      <Stack.Screen name="AddToCart" component={AddToCartComponent} />
      <Stack.Screen name="Checkout" component={CheckoutComponent} />
    </Stack.Navigator>
  );
}


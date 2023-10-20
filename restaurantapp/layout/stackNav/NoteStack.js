import { createStackNavigator } from "@react-navigation/stack";
const stack = createStackNavigator();
import DailyNotes from "../../components/Notes/DailyNotes";
import NoteDetails from "../../components/Notes/NoteDetails";
import AddNotes from "../../components/Notes/AddNote";
export default function NoteStackNavigator() {

    return (

        <stack.Navigator>
            <stack.Screen name="notelist" component={DailyNotes} />
            <stack.Screen name="noteDetails" component={NoteDetails} />
            <stack.Screen name="addNotes" component={AddNotes} />
        </stack.Navigator>

    )



}
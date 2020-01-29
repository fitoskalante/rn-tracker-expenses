import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/App/HomeScreen";
import OtherScreen from "../screens/App/OtherScreen";

const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });

export default AppStack;

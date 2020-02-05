import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/App/HomeScreen";
import OtherScreen from "../screens/App/OtherScreen";

const AppStack = createStackNavigator(
  { Home: HomeScreen, Other: OtherScreen },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    },
    navigationOptions: {
      tabBarLabel: "Home!"
    }
  }
);

export default AppStack;

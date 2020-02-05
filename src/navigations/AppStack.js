import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../screens/App/HomeScreen";
import Details from "../screens/App/Details";

const AppStack = createStackNavigator(
  { Home: HomeScreen, Details: Details },
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

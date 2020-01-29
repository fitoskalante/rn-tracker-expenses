import { createStackNavigator } from "react-navigation-stack";
import SignInScreen from "../screens/Auth/SignInScreen";

const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default AuthStack;

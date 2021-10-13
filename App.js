import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import OnboardingScreen from "./screens/OnboardingScreen";
import LoginScreen from "./screens/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignupScreen from "./screens/SignupScreen";

const AppStack = createStackNavigator();

const App = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    const FirstLaunch = async () => {
      let launch = await AsyncStorage.getItem("alreadyLaunched");
      if (launch == null) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    FirstLaunch;
  }, []);

  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <AppStack.Navigator>
          <AppStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ header: () => null }}
          />
          <AppStack.Screen name="Signup" component={SignupScreen} />
        </AppStack.Navigator>
      ) : (
        <AppStack.Navigator>
          <AppStack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ header: () => null }}
          />
          <AppStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ header: () => null }}
          />
          <AppStack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerTitle: "",
              headerStyle: {
                backgroundColor: "#f9fafd",
                shadowColor: "#f9fafd",
              },
            }}
          />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;

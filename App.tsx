/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import SplashScreen from "react-native-splash-screen";
import AllowLocation from "./src/pages/AllowLocation/AllowLocation";
import Percise from "./src/pages/Percise/Percise";
import Auth from "./src/pages/Auth/Auth";
import PhoneNumber from "./src/pages/PhoneNumber/PhoneNumber";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./src/props/Props";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  function Root() {
    const [logged, setLogged] = useState(false);

    React.useEffect(() => {
      getData();
    }, [logged]);

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user_reg");

        if (value) setLogged(JSON.parse(value));
      } catch (e) {
        // error reading value
      }
    };

    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {logged ? (
          <Stack.Screen name="allow" component={AllowLocation} />
        ) : (
          <Stack.Screen name="welcome" component={Percise} />
        )}
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer theme={DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Root" component={Root} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;

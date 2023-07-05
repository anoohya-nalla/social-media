/**
 * Created by Anoohya Nalla on 2023-07-05.
 * Original code authored by Anoohya Nalla.
 */

import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import PostScreen from "./screens/PostScreen";
import { Image, Text, View } from "react-native";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTitle: () => (
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={require("./assets/anoohya-nalla-logo.png")}
                  style={{ width: 30, height: 30, marginRight: 8 }}
                />
                <Text style={{ fontSize: 20 }}>Home</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen name="Post" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

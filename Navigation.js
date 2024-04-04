import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "./src/screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./src/screens/Home";
import { AntDesign } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();


function TabGroup() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
        <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: () => <AntDesign name="user" size={24} color="black" />   ,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabGroup></TabGroup>
    </NavigationContainer>
  );
}

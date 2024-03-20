import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.js';
import RegisterScreen from '../screens/RegisterScreen.js';
import {HomeScreen} from '../screens/HomeScreen.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProductInfoScreen from '../screens/ProductInfoScreen.js';
import AddAddressScreen from '../screens/AddAddressScreen.js';
import AddressScreen from '../screens/AddressScreen.js';
import CartScreen from '../screens/CartScreen.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import ConfirmationScreen from '../screens/ConfirmationScreen.js';
import OrderScreen from '../screens/OrderScreen.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: {
              color: '#008E97',
            },
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Entypo name="home" size={30} color="#008E97" />
              ) : (
                <Feather name="home" size={30} color="#000000" />
              ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarLabelStyle: {
              color: '#008E97',
            },
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person-sharp" size={30} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={30} color="#000000" />
              ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: 'Cart',
            tabBarLabelStyle: {
              color: '#008E97',
            },
            headerShown: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <MaterialIcons name="shopping-cart" size={30} color="#008E97" />
              ) : (
                <AntDesign name="shoppingcart" size={30} color="#000000" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Info"
          component={ProductInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Address"
          component={AddAddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Add"
          component={AddressScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Confirm"
          component={ConfirmationScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

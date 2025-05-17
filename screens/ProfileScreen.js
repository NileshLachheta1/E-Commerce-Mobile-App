import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import logo from '../assets/logo.png';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URLS } from '../utils/urls';
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1',
      },
      headerLeft: () => (
        <Image
          style={{ width: 180, height: 120, resizeMode: 'contain' }}
          source={logo}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}>
          <Ionicons name="notifications-outline" size={24} color="black" />
          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const [user, setUser] = useState();
  // const [token, setToken] = useState('');
  useEffect(() => {
    const getTokenData = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        // setToken(token);

        console.log("token value : ", token)

        //  Fetch user Details
        const response = await axios.get(
          `${URLS.BASE_URL}user/profile/${token}`,
        );
        const { user } = response.data;
        setUser(user);
        console.log("user : ", response)

        //  Fetch User Order Data
        const responseOrderdata = await axios.get(`${URLS.BASE_URL}user/orders/${token}`);
        const order = responseOrderdata.data.orders;

        console.log("orders : ", responseOrderdata)
        setOrders(order);
        setLoading(false);
      } catch (error) {
        console.log('Error=============== : ', error);
      }
    }
    getTokenData();

  }, []);
  const logout = () => {
    clearAutoToken();
  };
  const clearAutoToken = async () => {
    await AsyncStorage.removeItem('authToken');
    console.log('auth token cleared');
    navigation.replace('Login');
  };

  // console.log("orders :  ", orders);
  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: 'white' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
        {/* Welcome {user.name} */}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{ textAlign: 'center', color: "black", fontWeight: "500" }}>Your Orders</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{ textAlign: 'center', color: "black", fontWeight: "500" }}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          marginTop: 12,
        }}>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{ textAlign: 'center', color: "black", fontWeight: "500" }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: '#E0E0E0',
            borderRadius: 25,
            flex: 1,
          }}>
          <Text style={{ textAlign: 'center', color: "black", fontWeight: "500" }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text style={{ fontSize: 16, fontWeight: '500', color: "black", marginVertical: 10 }}>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={order._id}
            >
              {/* Render the order information here */}
              {order.products.slice(0, 1)?.map((product) => (
                <View style={{ marginVertical: 10 }} key={product._id}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

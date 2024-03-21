import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.replace('Main');
        }
      } catch (error) {
        console.log('Error Message',error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };
    console.log('------>  ', user);

    axios
      .post('http://192.168.1.16:8000/login', user)
      .then(response => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem('authToken', token);
        navigation.replace('Main');
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Error While Login ', 'Invalid Email & Password');
      });
  };
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center', marginTop:50}}>
      <View>
        <Image
          style={{width: 150, height: 100}}
          source={{
            uri: 'https://pngimg.com/uploads/amazon/small/amazon_PNG21.png',
          }}></Image>
      </View>
      <KeyboardAvoidingView>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42',
            }}>
            Login In to your Account
          </Text>
        </View>
        <View style={{marginTop: 70}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 6,
              borderRadius: 8,
              marginTop: 30,
            }}>
            <TextInput
              value={email}
              onChangeText={text => {
                setEmail(text);
              }}
              style={{color: 'gray', width: 350, fontSize: 18}}
              placeholder="Enter your Email"></TextInput>
          </View>
        </View>

        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 6,
              borderRadius: 8,
              marginTop: 30,
            }}>
            {/* <FontAwesome6 name="envelope" size={24} color="black" /> */}
            <TextInput
              value={password}
              onChangeText={text => {
                setPassword(text);
              }}
              secureTextEntry={true}
              style={{color: 'gray', width: 350, fontSize: 18}}
              placeholder="Enter Password"></TextInput>
          </View>
        </View>

        <View
          style={{
            marginTop: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Keep me logged in</Text>
          <Text style={{color: '#007FFF', fontWeight: '500'}}>
            Forgot Password
          </Text>
        </View>

        <View style="marginTop : 50 " />

        <Pressable
          onPress={handleLogin}
          style={{
            width: 200,
            backgroundColor: '#FEBE10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
            }}>
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{textAlign: 'center', padding: 10, fontSize: 18}}>
            Don't Have an Account? SignUp Here
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});

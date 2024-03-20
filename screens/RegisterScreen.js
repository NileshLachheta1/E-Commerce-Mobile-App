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
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };
    console.warn(user);

    // send a post request to the backend api

    axios
      .post('http://192.168.1.11:8000/register', user)
      .then(response => {
        console.log(response);
        Alert.alert(
          'Registration Successful',
          'You have Registered Successfully',
        );
        setName('');
        setEmail('');
        setPassword('');
      })
      .catch(error => {
        console.log('---------', error);
        Alert.alert(
          'Registration Error',
          'An error occurred during registration. Please try again later.',
        );
      });
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
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
            Register to your Account
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
              value={name}
              onChangeText={text => {
                setName(text);
              }}
              style={{color: 'gray', width: 350, fontSize: 18}}
              placeholder="Enter your Name"></TextInput>
          </View>
        </View>
        <View>
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

        <View>
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
          onPress={handleRegister}
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
            Register
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{textAlign: 'center', padding: 10, fontSize: 18}}>
            Already have an accont? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {UserType} from '../UserContext.js';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const AddressScreen = () => {
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const {userId, setUserId} = useContext(UserType);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async() => {
      const token = await AsyncStorage.getItem('authToken');
      var payload = JSON.parse(window.atob(token.split('.')[1])); 
      const decodedToken = jwt_decode(token,{body:true});
      // const userId = decodedToken.userId;
      setUserId("65f7e36e92127dee17308a7d");
      // setUserId(userId);
      console.log("========================================================")
      console.log(">>>>>>>> :  ",decodedToken)
      // console.log("========================================================")
    };
    fetchUser();
  }, []);
  console.log(">>>>>>>   ",userId);

  const handleAddAddress = async() => {


    const address = {
        name,
        mobileNo,
        houseNo,
        street,
        landmark,
        postalCode
    }
    axios.post("http://192.168.1.11:8000/address",{userId,address}).then(()=>{
        Alert.alert("Success","Address Added Successfully");
        setName("");
        setMobileNo("");
        setHouseNo("");
        setStreet("");
        setLandmark("");
        setPostalCode("");

        setTimeout(()=>{
            navigation.goBack();
        },500)
    }).catch((error)=>{
      console.log("Error ----------: ",error);
        Alert.alert("Error","Failed to add Address");
        Alert.alert("Error : ",error)
    })
  };

  return (
    <ScrollView style={{marginTop: 10}}>
      {/* <Text>AddressScreen</Text> */}
      <View style={{height: 50, backgroundColor: '#00CED1'}} />
      <View style={{padding: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
          Add a new Address
        </Text>
        <TextInput
          placeholderTextColor={'black'}
          placeholder="India"
          style={{
            padding: 10,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            Fulll Name (First and last name)
          </Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="enter your name"
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            Mobile number
          </Text>
          <TextInput
            value={mobileNo}
            onChangeText={text => setMobileNo(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="Mobile Number"
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            Flat,House No,Building,Company
          </Text>
          <TextInput
            value={houseNo}
            onChangeText={text => setHouseNo(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            Area,Street,Sector,village
          </Text>
          <TextInput
            value={street}
            onChangeText={text => setStreet(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder=""
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            Landmark
          </Text>
          <TextInput
            value={landmark}
            onChangeText={text => setLandmark(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="eg: near appollo hospital"
          />
        </View>

        <View
          style={{
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'black'}}>
            Pincode
          </Text>
          <TextInput
            value={postalCode}
            onChangeText={text => setPostalCode(text)}
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
            placeholder="enter pincode"
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: '#FFC72C',
            padding: 15,
            borderRadius: 6,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontWeight: 'bold'}}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});

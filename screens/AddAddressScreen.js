import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserType} from '../UserContext';
const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const {userId, setUserId} = useContext(UserType);
  // setUserId("65f7e36e92127dee17308a7d");
  console.log('userId', userId);
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.31:8000/addresses/65f7e36e92127dee17308a7d`,
      );
      const addresses = response.data.addresses;
      setAddresses(addresses);
    } catch (error) {
      console.log(error);
    }
  };

  // Refresh the addresses when the component comes into the focus i.e. when we navigate back after adding address
  useFocusEffect(
    useCallback(()=> {
      fetchAddresses();
    },[])
  )
  // console.log('addresses', addresses);
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 50}}>
      <View
        style={{
          backgroundColor: '#00CED1',
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: 'white',
            borderRadius: 3,
            height: 38,
            flex: 1,
          }}>
          <AntDesign
            style={{paddingLeft: 10}}
            name="search1"
            size={22}
            color="#000000"
          />
          <TextInput placeholder="Search Amazon.in"></TextInput>
        </Pressable>
        <Feather
          style={{paddingLeft: 10}}
          name="mic"
          size={22}
          color="#000000"
        />
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
          Your Addresses
        </Text>

        <Pressable
          onPress={() => navigation.navigate('Add')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
            borderColor: '#D0D0D0',
            borderWidth: 2,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingVertical: 7,
            paddingHorizontal: 5,
          }}>
          <Text style={{color: 'black'}}>Add a new Address</Text>
          <MaterialIcons
            style={{paddingLeft: 10}}
            name="keyboard-arrow-right"
            size={24}
            color="#000000"
          />
        </Pressable>
        <Pressable>
          {/* all the added addresses */}
          {addresses.map((item, index) => {
            return (
              <Pressable
                style={{
                  borderWidth: 1,
                  borderColor: '#D0D0D0',
                  padding: 10,
                  flexDirection: 'column',
                  gap: 5,
                  marginVertical: 10,
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', gap: 3}}>
                  <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                    {item.name}
                  </Text>
                  <Entypo
                    style={{paddingLeft: 10}}
                    name="location-pin"
                    size={24}
                    color="red"
                  />
                </View>
                <Text style={{fontSize: 15, color: '#181818'}}>
                  {item.houseNo},{item.landmark}
                </Text>
                <Text style={{fontSize: 15, color: '#181818'}}>
                  {item.street}
                </Text>
                <Text style={{fontSize: 15, color: '#181818'}}>
                  India, Banglore
                </Text>
                <Text style={{fontSize: 15, color: '#181818'}}>
                  Phone No. {item.mobileNo}
                </Text>
                <Text style={{fontSize: 15, color: '#181818'}}>
                  Pin Code {item.postalCode}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    marginTop: 10,
                  }}>
                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#D0D0D0',
                    }}>
                    <Text>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#D0D0D0',
                    }}>
                    <Text>Remove</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#D0D0D0',
                    }}>
                    <Text>Set as Default</Text>
                  </Pressable>
                </View>
              </Pressable>
            );
          })}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});

import {StyleSheet, Text, View, ScrollView, Pressable, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {cleanCart} from '../redux/CartReducer';
import RazorpayCheckout from 'react-native-razorpay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URLS } from '../utils/urls';

const ConfirmationScreen = () => {
  const steps = [
    {title: 'Address', content: 'Address Form'},
    {title: 'Delivery', content: 'Delivery Options'},
    {title: 'Payment', content: 'Payment Details'},
    {title: 'Place Order', content: 'Order Summary'},
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const cart = useSelector(state => state.cart.cart);
  const [token,setToken] = useState('');
  // console.log('Cart -->   ', cart);
  const total = cart
    .map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  useEffect(() => {
    const getTokenData = async ()=>{
      const tokendata = await AsyncStorage.getItem('authToken');
      // console.log("order token : ",tokendata)
      setToken(tokendata);
      try {
        console.log(tokendata)
        const response = await axios.get(
          `${URLS.BASE_URL}user/addresses/${tokendata}`,
        );
        // console.log("addresses : ",response)
        const addresses = response.data.addresses;
        setAddresses(addresses);
      } catch (error) {
        console.log("Error On Fetch Address",error);
      }
    }

    getTokenData();
    // console.log("order palce ")
  }, []);


  const [selectedAddress, setSelectedAddress] = useState('');
  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handlePlaceOrder = async () => {
    try {
      console.log("token ----> : ",token)
      const orderData = {
        userId: token,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: selectedOptions,
      };

      const response = await axios.post(
        `${URLS.BASE_URL}user/orders`,
        orderData,
      );
      if (response.status == 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
        console.log('Order Created Successfully');
      } else {
        console.log('error creating order', response.data);
      }
    } catch (error) {
      console.log('Error in handle Place Order : ', error);
    }
  };

  // console.log("address :  ",selectedAddress)

  const pay = async () => {
    try {
      const options = {
        description: 'Adding to Wallet',
        currency: 'INR',
        name: 'Amazon',
        key: 'rzp_test_E3GWYimxN7YMk8',
        amount: total * 100,
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'RazorPay Software',
        },
        theme: {color: '#F37254'},
      };
      const data = await RazorpayCheckout.open(options);

      // console.log("Data : ",data)
      const orderData = {
        userId: token,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress,
        paymentMethod: "card",
      };

      const response = await axios.post(
        `${URLS.BASE_URL}user/orders`,
        orderData,
      );
      if (response.status === 200) {
        navigation.navigate('Order');
        dispatch(cleanCart());
        console.log('Order Created Successfully', response.data.order);
      } else {
        console.log('error creating order', response.data);
      }
    } catch (error) {
      console.log('Error  : ', error);
    }
  };

  return (
    <ScrollView style={{marginTop: 55}}>
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 40}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          {steps.map((step, index) => {
            return (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {index > 0 && (
                  <View
                    style={[
                      {flex: 1, height: 2, backgroundColor: 'green'},
                      index <= currentStep && {backgroundColor: 'green'},
                    ]}
                  />
                )}
                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 15,
                      backgroundColor: '#ccc',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                    index < currentStep && {
                      backgroundColor: 'green',
                    },
                  ]}>
                  {index < currentStep ? (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      &#10003;
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: 'white',
                      }}>
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text style={{alignItems: 'center', marginTop: 8}}>
                  {step.title}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {currentStep == 0 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
            Select Delivery Address
          </Text>
          <Pressable>
            {addresses.map((item, index) => {
              return (
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderColor: '#D0D0D0',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                    padding: 10,
                    marginVertical: 7,
                    borderRadius: 6,
                  }}>
                  {selectedAddress && selectedAddress._id === item._id ? (
                    <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                  ) : (
                    <Entypo
                      onPress={() => {
                        setSelectedAddress(item);
                      }}
                      name="circle"
                      size={20}
                      color="gray"
                    />
                  )}
                  <View style={{marginLeft: 6}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 3,
                      }}>
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        {item.name}
                      </Text>
                      <Entypo
                        style={{paddingLeft: 10}}
                        name="location-pin"
                        size={20}
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
                    <View>
                      {selectedAddress && selectedAddress._id === item._id && (
                        <Pressable
                          onPress={() => {
                            setCurrentStep(1);
                          }}
                          style={{
                            backgroundColor: '#008397',
                            padding: 10,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                          }}>
                          <Text style={{textAlign: 'center', color: 'white'}}>
                            Deliver to this address
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </Pressable>
        </View>
      )}

      {currentStep == 1 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Choose your delivery options
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 8,
              gap: 7,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            {options ? (
              <FontAwesome5 name="dot-circle" size={20} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setOptions(!options);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}
            <Text style={{flex: 1}}>
              <Text style={{color: 'green', fontWeight: '500'}}>
                Tommorrow by 10pm
              </Text>
              - Free Delievery with your Prime Membership
            </Text>
          </View>
          <Pressable
            onPress={() => {
              setCurrentStep(2);
            }}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 2 && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Select your Payment Method
          </Text>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOptions == 'cash' ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOptions('cash');
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>Cash On Delivery</Text>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 7,
              marginTop: 12,
            }}>
            {selectedOptions == 'card' ? (
              <FontAwesome5 name="dot-circle" size={24} color="#008397" />
            ) : (
              <Entypo
                onPress={() => {
                  setSelectedOptions('card');
                  Alert.alert("UPI/Debit card", "Pay Online", [
                    {
                      text: "Cancel",
                      onPress: () => console.log("Cancel is pressed"),
                    },
                    {
                      text: "OK",
                      onPress: () => pay(),
                    },
                  ]);
                }}
                name="circle"
                size={20}
                color="gray"
              />
            )}

            <Text>UPI/ credit or debit card</Text>
          </View>

          <Pressable
            onPress={() => {
              setCurrentStep(3);
            }}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Text>Continue</Text>
          </Pressable>
        </View>
      )}

      {currentStep == 3 && selectedOptions == 'cash' && (
        <View style={{marginHorizontal: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Now</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <View>
              <Text style={{fontSize: 17, fontWeight: 'bold'}}>
                Save 5% and never run out
              </Text>
              <Text style={{fontSize: 15, color: 'gray', marginTop: 5}}>
                Turn on auto deliveries
              </Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </View>
          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text>Shipping to {selectedAddress.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>
                Items
              </Text>
              <Text style={{color: 'gray', fontSize: 16}}>₹{total}</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>
                Delivery
              </Text>
              <Text style={{color: 'gray', fontSize: 16}}>₹0</Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Order Total
              </Text>
              <Text
                style={{color: '#C60C30', fontSize: 18, fontWeight: 'bold'}}>
                ₹{total}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              padding: 8,
              borderColor: '#D0D0D0',
              borderWidth: 1,
              marginTop: 10,
            }}>
            <Text style={{fontSize: 16, color: 'gray'}}>pay With</Text>
            <Text style={{fontSize: 16, fontWeight: '600', marginTop: 7}}>
              pay on Delivery (Cash)
            </Text>
          </View>

          <Pressable
            onPress={() => {
              handlePlaceOrder();
            }}
            style={{
              backgroundColor: '#FFC72C',
              padding: 10,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Text>Place your Order</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({});

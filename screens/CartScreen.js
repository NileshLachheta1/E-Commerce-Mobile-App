import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from '../redux/CartReducer';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);
  console.log('Cart -->   ', cart);
  const total = cart
    .map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);

  const dispatch = useDispatch();
  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = item => {
    dispatch(decrementQuantity(item));
  };

  const deleteItem = item => {
    dispatch(removeFromCart(item));
  };

  const navigation = useNavigation();
  console.log('total : ', total);
  return (
    <ScrollView style={{marginTop: 55, flex: 1, backgroundColor: 'white'}}>
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
      <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: '400', color:"black"}}>Subtotal : </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', color:"black"}}>{total}</Text>
      </View>
      <Text style={{marginHorizontal: 10, color:"black"}}>EMI Details Available</Text>
      {cart.length > 0 && (
        <Pressable
          onPress={() => {
            navigation.navigate('Confirm');
          }}
          style={{
            backgroundColor: '#FFC72C',
            padding: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
          }}>
          <Text  style={{fontSize: 16, fontWeight: '500', color:"black"}}>Proceed to Buy ({cart.length}) items</Text>
        </Pressable>
      )}

      <Text
        style={{
          height: 1,
          borderColor: '#D0D0D0',
          borderWidth: 1,
          marginTop: 16,
        }}
      />
      <View style={{marginHorizontal: 10}}>
        {cart.map((item, index) => {
          return (
            <View
              style={{
                backgroundColor: 'white',
                marginVertical: 10,
                borderBottomColor: '#F0F0F0',
                borderBottomWidth: 2,
              }}
              key={index}>
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Image
                    style={{width: 140, height: 140, resizeMode: 'contain'}}
                    source={{uri: item.image}}
                  />
                </View>
                <View>
                  <Text
                    numberOfLines={3}
                    style={{width: 150, marginTop: 10, color: 'black'}}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: 'black',
                      marginTop: 6,
                    }}>
                    {item.price}
                  </Text>
                  <Image
                    style={{width: 35, height: 35, resizeMode: 'contain'}}
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/b/bb/Prime_logo.png',
                    }}
                  />
                  <Text style={{color: 'green'}}>In Stock</Text>
                </View>
              </Pressable>

              <Pressable
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 7,
                  }}>
                  {item.quantity > 1 ? (
                    <Pressable
                      onPress={() => {
                        decreaseQuantity(item);
                      }}
                      style={{
                        backgroundColor: '#D8D8D8',
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}>
                      <AntDesign name="minus" size={24} color="#000000" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        deleteItem(item);
                      }}
                      style={{
                        backgroundColor: '#D8D8D8',
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6,
                      }}>
                      <AntDesign name="delete" size={24} color="#000000" />
                    </Pressable>
                  )}
                  <Pressable
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 18,
                      paddingVertical: 6,
                    }}>
                    <Text style={{color: 'black'}}>{item.quantity}</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      increaseQuantity(item);
                    }}
                    style={{
                      backgroundColor: '#D8D8D8',
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}>
                    <Feather name="plus" size={22} color="#000000" />
                  </Pressable>
                </View>
                <Pressable
                  onPress={() => {
                    deleteItem(item);
                  }}
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 8,
                    paddingVertical: 12,
                    borderRadius: 5,
                    borderColor: '#C0C0C0',
                    borderWidth: 0.6,
                  }}>
                  <Text style={{color: 'black'}}>Delete</Text>
                </Pressable>
              </Pressable>

              <Pressable
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 10,
                }}>
                <Pressable
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderColor: '#C0C0C0',
                    borderWidth: 0.6,

                  }}>
                  <Text style={{color: 'black'}}>Save For Later</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 8,
                    paddingVertical: 10,
                    borderRadius: 5,
                    borderColor: '#C0C0C0',
                    borderWidth: 0.6,
                  }}>
                  <Text style={{color: 'black'}}>See More Like this</Text>
                </Pressable>
              </Pressable>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});

import User from '../models/user.js';
import Order from '../models/order.js';
import mongoose from 'mongoose';
import {authenticateJWT} from '../middleware/jwt.js';

export const userAddNewAddressController = async (request, response) => {
  try {
    const {token, address} = request.body;

    // Authenticate the user and get the userId
    const userId = await authenticateJWT(token);

    // Find the user by userId
    const user = await User.findOne({_id: userId});

    if (!user) {
      return response.status(404).json({message: 'User not found'});
    }

    // Add the new address to the user's addresses array
    user.addresses.push(address);

    // Save the updated user in the backend
    await user.save();

    response.status(200).json({message: 'Address Created Successfully'});
  } catch (error) {
    console.error('Error adding address:', error);
    response.status(500).json({message: 'Error adding address'});
  }
};

export const userGetAllAddresses = async (request, response) => {
  try {
    const token = request.params.token;
    const userId = await authenticateJWT(token);
    const user = await User.findById(userId);
    if (!user) {
      return response.status(404).json({message: 'user not found'});
    }

    const addresses = user.addresses;
    console.log("Addresses data : ",addresses);
    response.status(200).json({addresses});
  } catch (error) {
    console.log("Error in addressdata controller",error);
    response.status(500).json({message: 'error retriving the addresses'});
  }
};

export const userAddAllOrders = async (request, response) => {
  try {
    const {userId, cartItems, totalPrice, shippingAddress, paymentMethod} =
      request.body;
      console.log("token in orders",userId)
      const userIdFromToken = await authenticateJWT(userId);
    const user = await User.findById(userIdFromToken);
    console.log('hii00000');

    if (!user) {
      return response.status(404).json({message: 'User not found'});
    }
    console.log('hii0');

    // create an array of products objects from the cart items
    const products = cartItems.map((item, index) => ({
      name: item.title,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    console.log('hii1');
    // create a new order

    const order = new Order({
      user: userIdFromToken,
      products: products,
      totalPrice: totalPrice,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
    });
    console.log('hii2');

    await order.save();
    console.log('hii3');

    response.status(200).json({message: 'Order Create Successfully.'});
  } catch (error) {
    console.log('Error creating orders', error);
    response.status(500).json({message: 'Error Creating Orders'});
  }
};

export const getUserProfiledata = async (request, response) => {
  try {
    const token = request.params.token;
    console.log("token ===> ",token)
    const userId = await authenticateJWT(token);
    console.log('userId -----> ', userId);
    const user = await User.findById(userId);

    if (!user) {
      return response.status(404).json({message: 'User not found'});
    }
    console.log('Hiiiiii ', user);
    response.status(200).json({user});
  } catch (error) {
    // console.log(error)
    response.status(500).json({message: 'Error Retriving the User Profile'});
  }
};

export const userGetAllOrderData = async (request, response) => {
  try {
    const token = request.params.token;
    const userId = await authenticateJWT(token);
    const orders = await Order.find({user: userId}).populate('user');
    if (!orders || orders.length == 0) {
      return response
        .status(404)
        .json({message: 'No Orders found for this user '});
    }
    console.log('Orders : ', orders);
    response.status(200).json({orders});
  } catch (error) {
    response.status(500).json({message: 'Error'});
  }
};

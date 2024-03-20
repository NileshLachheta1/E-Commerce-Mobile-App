import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import crypto, {generateKey} from 'crypto';
import User from './models/user.js';
import Order from './models/order.js';
import { request } from 'http';
const app = express();
const port = 8000;

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

mongoose
  .connect(
    'mongodb+srv://nileshlachheta1995:aaccihID0AiXQFxT@cluster0.nhpfyuq.mongodb.net/ECommerce',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => {
    console.log('Database Connection Successful');
  })
  .catch(err => {
    console.log('Error While Database Connection', err);
  });

app.listen(port, () => {
  console.log('Server Running at ', port);
});

// endpoint to register in the app

// function to send Verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  //  create a nodemailer transport
  const transporter = nodemailer.createTransport({
    // configure the email service
    service: 'gmail',
    auth: {
      user: 'nileshlachheta1995@gmail.com',
      pass: 'mydlzncehglllxkf',
    },
  });

  // compose the email message
  const mailOption = {
    from: 'nileshlachheta1995@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: `Please click the following link to verify your E-mail : http://localhost:8000/verify/${verificationToken}`,
  };

  // send email
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log('Error sending the verification E-mail', error);
  }
};

app.post('/register', async (request, response) => {
  try {
    const {name, email, password} = request.body;

    // check email is already register
    const existingUser = await User.findOne({email});

    if (existingUser) {
      return response.status(400).json({message: 'E-mail already registered'});
    } else {
      // Create a new user
      const newUser = new User({name, email, password});

      // generate and store the verification token
      newUser.verificationToken = crypto.randomBytes(20).toString('hex');

      // save the user to the database
      await newUser.save();

      // send verification email to the user
      sendVerificationEmail(newUser.email, newUser.verificationToken);
    }
  } catch (err) {
    console.log('Error While Registration', err);
    response.status(500).json({message: 'Registration Failed'});
  }
});

// endpoint to verify the email
app.get('/verify/:token', async (request, response) => {
  try {
    const token = request.params.token;

    // find the user with the given verification token
    const user = await User.findOne({verificationToken: token});

    if (!user) {
      return response.status(404).json({message: 'Invalid Verification token'});
    }

    // mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;
    await user.save();
    response.status(200).json({message: 'E-mail Verified Successfully'});
  } catch (error) {
    response.status(500).json({message: 'Email Verification Failed'});
  }
});

const generateSecreyKey = () => {
  const secretkey = crypto.randomBytes(32).toString('hex');
  return secretkey;
};

const secretkey = generateSecreyKey();

// end point to login the user

app.post('/login', async (request, response) => {
  try {
    const {email, password} = request.body;

    // check if the user exists
    const user = await User.findOne({email});

    if (!user) {
      return response.status(401).json({message: 'invalid email or password'});
    }

    // check if the password is correct
    if (user.password !== password) {
      return response.status(401).json({message: 'invalid password'});
    }

    // generate a token

    const token = jwt.sign({userId: user._id}, secretkey);

    response.status(200).json({token});
  } catch (error) {
    // console.log(error);
    response.status(500).json({message: 'Login Failed'});
  }
});

// endpoint to store a new address to the backend
app.post("/address", async (request,response)=>{
  try {
    const{userId, address} = request.body;
    console.log("inside backend : ",request.body);
    // find the user by UserId
    const user = await User.findById(userId);
    
    if(!user){
      return response.status(404).json({message:"User not found"});
    }

    // add the new address to the user's addresses array
    user.addresses.push(address);

    // save the updated user in the backend
    await user.save();
    response.status(200).json({message:"Address Created Successfully"});

  } catch (error) {
    response.status(500).json({message:"Error adding address"});
  }
}) 


//  endpoint to get all the addresses of a particular user
app.get("/addresses/:userId", async(request,response)=>{
  try {
    const userId = request.params.userId;

    const user = await User.findById(userId);
    if(!user){
      return response.status(404).json({message:"user not found"});
    }

    const addresses  = user.addresses;
    response.status(200).json({addresses})
  } catch (error) {
    response.status(500).json({message : "error retriving the addresses"})
  }
})


// endpoint to store all the orders
app.post("/orders", async(request,response)=>{
  try {
    const {userId, cartItems, totalPrice, shippingAddress, paymentMethod} = request.body;
    const user = await User.findById(userId);

    if(!user){
      return response.status(404).json({message:"User not found"});
    }

    // create an array of products objects from the cart items
    const products = cartItems.map((item,index)=>({
      name : item.title, 
      quantity : item.quantity,
      price : item.price,
      image : item.image,

    }))

    // create a new order

    const order = new Order({
      user : userId,
      products : products,
      totalPrice : totalPrice,
      shippingAddress : shippingAddress,
      paymentMethod : paymentMethod
    })

    await order.save();

    response.status(200).json({message : "Order Create Successfully."})
  } catch (error) {
    console.log("Error creating orders",error);
    response.status(500).json({message:"Error Creating Orders"})
  }
})

// get the user Profile
app.get("/profile/:userId", async(request,response) =>{
  try {
    const userId = request.params.userId;

    const user = await User.findById(userId);

    if(!user){
      return response.status(404).json({message : "User not found"})
    }
    response.status(200).json({user});
  } catch (error) {
    response.status(500).json({message:"Error Retriving the User Profile"}) 
  }
})


app.get("/orders/:userId", async (request,response)=>{
  try {
    const userId = request.params.userId;

    const orders = await Order.find({user : userId}).populate("user");
    if(!orders || orders.length == 0){
      return response.status(404).json({message : "No Orders found for this user "})
    }

    response.status(200).json({orders})
  } catch (error) {
    response.status(500).json({message:"Error"})
  }
})
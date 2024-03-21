import User from "../models/user.js";
import mongoose from "mongoose";
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from "../middleware/nodemailer.js";

export const indexSignUpUserController =  async (request, response) => {
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
        console.log("email sent");
        sendVerificationEmail(newUser.email, newUser.verificationToken);
      }
    } catch (err) {
      console.log('Error While Registration', err);
      response.status(500).json({message: 'Registration Failed'});
    }
  };


export const indexUserVerifyEmailController = async (request, response) => {
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
  } 

export const indexUserLoginController =  async (request, response) => {
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
      const secretkey = crypto.randomBytes(32).toString('hex');

      const token = jwt.sign({userId: user._id}, secretkey);
  
      response.status(200).json({token});
    } catch (error) {
      console.log(error);
      response.status(500).json({message: 'Login Failed'});
    }
  }


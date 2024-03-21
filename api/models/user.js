import mongoose from "mongoose";
import connection from "../db/connection.js";
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true,
    },
    verified : {
        type : Boolean,
        default : false
    },
    verificationToken :String,
    addresses : [
        {
            name: String,
            mobileNo : String,
            houseNo : String,
            street : String,
            landmark : String,
            city : String,
            country : String,
            postalCode : String,
 
        }
    ],
    orders : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Order"
        }
    ],
    createdAt : {
        type : Date,
        default : Date.now
    },
});


var User = mongoose.model("User",userSchema,"User");
export default User;

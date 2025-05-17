import express from 'express';
import { getUserProfiledata, userAddAllOrders, userAddNewAddressController, userGetAllAddresses, userGetAllOrderData } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.post("/address",userAddNewAddressController);
userRouter.get("/addresses/:token",userGetAllAddresses);
userRouter.post("/orders",userAddAllOrders);
userRouter.get("/profile/:token",getUserProfiledata);
userRouter.get("/orders/:token",userGetAllOrderData);

export default userRouter;
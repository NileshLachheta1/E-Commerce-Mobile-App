import express from 'express';
import { getUserProfiledata, userAddAllOrders, userAddNewAddressController, userGetAllAddresses, userGetAllOrderData } from '../controller/userController.js';
const userRouter = express.Router();

userRouter.post("/address",userAddNewAddressController);
userRouter.get("/addresses/:userId",userGetAllAddresses);
userRouter.post("/orders",userAddAllOrders);
userRouter.get("/profile/:userId",getUserProfiledata);
userRouter.get("/orders/:userId",userGetAllOrderData);

export default userRouter;
import express from 'express';
import { indexSignUpUserController,indexUserLoginController,indexUserVerifyEmailController } from '../controller/indexController.js';
const indexrouter = express.Router();

indexrouter.post('/register',indexSignUpUserController);
indexrouter.get("/verify/:token", indexUserVerifyEmailController);
indexrouter.post("/login", indexUserLoginController);
export default indexrouter;
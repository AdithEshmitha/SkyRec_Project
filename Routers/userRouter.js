import express from 'express';
import { createUser, loginUser } from '../Controllers/userController.js';

const userRoute = express.Router();

userRoute.post("/", createUser);
userRoute.post("/login", loginUser);

export default userRoute;
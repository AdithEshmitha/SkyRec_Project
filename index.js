//Import Modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './Routers/userRouter.js';
import jwt from 'jsonwebtoken';
import productRouter from './Routers/productRouter.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

// Get Express and Connection String
const app = express();
const connectionString = process.env.MONGO_URI;

// Use Body Parser
app.use(bodyParser.json());
app.use(cors());

// Custom Middlewere
app.use(
    (req, res, next) => {
        const value = req.header("Authorization")
        if (value != null) {
            const token = value.replace("Bearer ", "")
            jwt.verify(
                token,
                process.env.JWT_KEY,
                (err, decoded) => {
                    if (decoded == null) {
                        res.status(403).json({
                            message: "Unauthorized"
                        })
                    } else {
                        req.user = decoded
                        next()
                    }
                }
            )
        } else {
            next()
        }
    }
)

// Connect Express to Database
mongoose.connect(connectionString).then(
    () => {
        console.log("Database Connected...");
    }
).catch(
    () => {
        console.log("Failed to Connect Database !!!");
    }
);

app.use("/users", userRoute);
app.use("/products", productRouter);

// Server Run Code
app.listen(5000, () => {
    console.log("Server Started...");
});
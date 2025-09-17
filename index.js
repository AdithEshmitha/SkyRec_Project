//Import Modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './Routers/userRouter.js';
import jwt from 'jsonwebtoken';

// Get Express and Connection String
const app = express();
const connectionString = "mongodb+srv://admin_user:adith1234@cluster0.25dxlmv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Use Body Parser
app.use(bodyParser.json());

// Custom Middlewere
app.use(
    (req, res, next) => {
        const value = req.header("Authorization");
        if (tokenInCor != null) {

            const newTokenn = tokenInCor.replace("Bearer ", "");

            jwt.verify(newTokenn, "auth_$0425",
                (err, decode) => {

                    if (decode == null) {
                        res.status(403).json(
                            {
                                massage: "Unauthorized Access Detected"
                            }
                        );

                    } else {

                        req.user = decode;
                        next();

                    }
                }
            );

        } else {
            next();
        }
    }
);

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

// Server Run Code
app.listen(5000, () => {
    console.log("Server Started...");
});
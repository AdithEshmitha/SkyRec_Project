import mongoose from "mongoose";

const userScheme = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            default: "Not Given"
        },
        isBlocked: {
            type: Boolean,
            default: false
        },
        role: {
            type: String,
            default: "user"
        },
        isEmailVeryfied: {
            type: Boolean,
            default: false
        },
        image: {
            type: String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
        }
    }
);

const Users = mongoose.model("users", userScheme);

export default Users; 
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";


const authUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email });

   if (user&& (await user.matchPassword(password))) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
  
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })




    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
   }else {
    res.status(401);
    throw new Error("Invalid email or password");
   }                                       
});



const registerUser = asyncHandler(async (req, res) => {
    res.send("register User");
   
});


const logoutUser = asyncHandler(async (req, res) => {
    res.send("logout User");
   
});


const getUserProfile = asyncHandler(async (req, res) => {
    res.send("get User Profile");
   
});


const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("update User Profile");
   
});

const getUsers = asyncHandler(async (req, res) => {
    res.send("get Users");
   
});

const getUserById = asyncHandler(async (req, res) => {
    res.send("get User By Id");
   
});


const deleteUser = asyncHandler(async (req, res) => {
    res.send("delete Users");
   
});


const updateUser = asyncHandler(async (req, res) => {
    res.send("update User");
   
});

export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers, getUserById, deleteUser, updateUser };






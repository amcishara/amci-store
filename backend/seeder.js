import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(colors.cyan("Connected to MongoDB"));
});

const importData = async () => {
    try {
        await User.deleteMany({});
        await Product.deleteMany({});
        await Order.deleteMany({});

    const createdUsers = await User.insertMany(users.users);
    const adminUser = createdUsers[0]._id;
    const sampleProduct = products.map(product => {
        return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);
    
    console.log("Data Imported!".green.inverse);
    process.exit();

    }
    catch (error) {
        console.log(error.message.red.inverse);
        process.exit(1);
    }

};

const destroyData = async () => {
    try {
        await Order.deleteMany({});
        await Product.deleteMany({});
        await User.deleteMany({});

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    }
    catch (error) {
        console.log(error.message.red.inverse);
        process.exit(1);
    }
}


if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}



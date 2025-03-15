import mongoose from "mongoose";

export const dbConnection = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "CDP_FULL_STACK"
    }).then(() => {
        console.log("Database connected successfully");
    }).catch((err) => {
        console.log("Error connecting to database", err);
    });
}
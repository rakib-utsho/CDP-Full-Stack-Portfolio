import express from "express";
import { config } from "dotenv"; // import config from dotenv
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import userRouter from "./router/userRouter.js";

const app = express(); // create express app

config({ path: "./config/config.env" }); // configure dotenv

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);

dbConnection();

app.use(errorMiddleware);
export default app;

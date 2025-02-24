import express from "express";
import "dotenv/config";
import router from "./router";
import cors from "cors";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";

connectDB();

const app = express();

app.use(cors(corsConfig));

app.use(express.json());

app.use("/", router);

export default app;

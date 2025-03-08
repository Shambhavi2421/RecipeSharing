import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipe.js";
require("dotenv").config();

// const express = require("express");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/recipe", recipesRouter);

mongoose.connect(
  "mongodb+srv://user:user123@cluster0.7qstk.mongodb.net/dbuser?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    console.log("DB connected...")
  )

app.listen(3001, () => console.log("Server started"));

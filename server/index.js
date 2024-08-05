import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from 'axios'
// import crypto from 'crypto';
// console.log(crypto.randomBytes(32).toString('base64'));

// DB
import DB from "./db/dbConnection.js";
// Routes
import imageRoutes from "./routes/imageRoutes.js";
import clothesRouter from "./routes/clothesRouter.js";
import usersRoutes from "./routes/usersRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// import audioRouter from "./routes/audioRouter.js";
import chatRouter from "./routes/chatRouter.js";
import imageRouter from "./routes/imageRouter.js";
import weatherRouter from "./routes/weatherRouter.js";

// middlewares
import errorHandler from "./middlewares/errorHandler.js";
import validateProvider from "./middlewares/validateProvider.js";
import validateMode from "./middlewares/validateMode.js";

let weather =""

// const getWeather = async (latitude,longitude) => {
const getWeather = async (location) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  // const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;


  try {
    const response = await axios.get(url);
    const data = response.data;
    weather=`the location is ${data?.location.name} and the weather is ${data?.current.condition.text} `
    console.log("data", data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

getWeather('London');

dotenv.config();
const app = express();
const PORT = process.env.PORT;
DB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.use(cors({ origin: "*" }), express.json());
app.use(cors({ origin: "*" }), express.json());
app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/users`, usersRoutes);
app.use(`/api/v1/clothes`, clothesRouter);
app.use(`/api/v1/images`, imageRoutes);
app.use("/api/v1/weather",  weatherRouter);

app.use(validateProvider, validateMode,)
// app.use("/api/v1/audio/speech",  audioRouter);
app.use("/api/v1/chat/completions",  chatRouter);
app.use("/api/v1/images/generations",  imageRouter);

app.use(`*`, (req, res) =>
  res.status(404).json({ message: "Page not found!" })
);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

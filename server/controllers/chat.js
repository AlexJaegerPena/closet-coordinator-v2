import axios from 'axios'
import OpenAI from "openai";
import OpenAIMock from "../utils/OpenAIMock.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createChat = asyncHandler(async (req, res) => {
  const {
    body: { stream, ...request },
    headers: { mode },
  } = req;

  let openai;

  let weather=""
  
  
  const getWeather = (location) => { 
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=London`;
  const {data}=axios.get(url)
  weather=data
  console.log(data)

 }

 getWeather()

  let message=""

  mode === "production"
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());

  const completion = await openai.chat.completions.create({
    stream,
    message,
  });

  if (stream) {
    res.writeHead(200, {
      Connection: "keep-alive",
      "Cache-Control": "no-cache",
      "Content-Type": "text/event-stream",
    });
    for await (const chunk of completion) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.end();
    res.on("close", () => res.end());
  } else {
    res.json(completion.choices[0]);
  }
});

// import OpenAI from "openai";
// import OpenAIMock from "../utils/OpenAIMock.js";
// import asyncHandler from "../utils/asyncHandler.js";

// export const createChat = asyncHandler(async (req, res) => {
//   const {
//     body: { stream, ...request },
//     headers: { mode },
//   } = req;

//   let openai;

//   mode === "production"
//     ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
//     : (openai = new OpenAIMock());

//   const completion = await openai.chat.completions.create({
//     stream,
//     ...request,
//   });

//   if (stream) {
//     res.writeHead(200, {
//       Connection: "keep-alive",
//       "Cache-Control": "no-cache",
//       "Content-Type": "text/event-stream",
//     });
//     for await (const chunk of completion) {
//       res.write(`data: ${JSON.stringify(chunk)}\n\n`);
//     }
//     res.end();
//     res.on("close", () => res.end());
//   } else {
//     res.json(completion.choices[0]);
//   }
// });

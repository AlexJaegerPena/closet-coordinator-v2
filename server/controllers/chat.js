import Clothes from '../models/Clothes.js'

import OpenAI from "openai";
import OpenAIMock from "../utils/OpenAIMock.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createChat = asyncHandler(async (req, res) => {
  const {
    body: { stream, ...request },
    headers: { mode },
  } = req;

  
  const dataClothes = await Clothes.find();
  if (!dataClothes) {
    return next(new ErrorResponse(`Server error`, 500));
  }

  
  let collectMessage=`
  give me two diffrent arrays of clothes recomendations according to the status of the weathre in ${request?.messages?.location?.region}`
let message={
  "model": "gpt-4o-mini",
  "messages": [
      {
          "role": "system",
          "content": `You are a helpful assistant who gives JSON code only from this database ${dataClothes} as an answer.`
      },
      {
          "role": "user",
          "content": collectMessage
      },
  ],
  "stream": false
}

  let openai;

  mode === "production"
    ? (openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY }))
    : (openai = new OpenAIMock());

  const completion = await openai.chat.completions.create({
    stream,
    ...message,
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
    console.log(completion.choices[0])
    res.json(completion.choices[0]);
  }
});

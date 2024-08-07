import Clothes from "../models/Clothes.js";

import OpenAI from "openai";
import OpenAIMock from "../utils/OpenAIMock.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createChat2 = asyncHandler(async (req, res) => {
  const {
    body: { stream, ...request },
    headers: { mode },
  } = req;

  const dataClothes = await Clothes.find();
  if (!dataClothes) {
    return next(new ErrorResponse(`Server error`, 500));
  }

  let collectMessage;

  let message = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a helpful and friendly clothing assistant who recommends 1 item of clothes from this database only returning ${dataClothes.color} and ${dataClothes.type}. As part of your answer, you provide data about the weather from ${request?.messages?.location?.region} to help make decisions on what clothes to wear for the day.`,
      },
      {
        role: "user",
        content: "What clothes should I wear today?",
      },

      {
        role: "assistant",
        content: collectMessage,
      },
    ],
    stream: false,
  };

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
    console.log(completion.choices[0]);
    res.json(completion.choices[0]);
  }
});

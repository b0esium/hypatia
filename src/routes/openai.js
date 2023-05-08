const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");

const OPENAIAPI_TEXT_URL = process.env.OPENAIAPI_TEXT_URL;
const OPENAIAPI_KEY_VALUE = process.env.OPENAIAPI_KEY_VALUE;

// initialize cache
let cache = apicache.middleware;

// text API
router.get("/text", cache("60 minutes"), async (req, res) => {
  try {
    const prompt = req.query.prompt;
    const options = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${OPENAIAPI_KEY_VALUE}`,
      },
    };
    const body = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0,
    };
    const apiRes = await needle("post", `${OPENAIAPI_TEXT_URL}`, body, options);
    const data = apiRes.body;
    // log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`OPENAI REQUEST: ${OPENAIAPI_TEXT_URL}, ${body}, ${options}`);
    }
    res.status(200).setHeader("Access-Control-Allow-Origin", "*").json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;

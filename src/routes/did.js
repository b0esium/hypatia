const express = require("express");
const router = express.Router();
const needle = require("needle");
const apicache = require("apicache");

const DID_URL = process.env.DID_URL;
const DID_KEY_VALUE = process.env.DID_KEY_VALUE;

// initialize cache
let cache = apicache.middleware;

// initiate video creation & get id
router.get("/id", cache("60 minutes"), async (req, res) => {
  try {
    const input = req.query.input;
    const options = {
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Basic ${DID_KEY_VALUE}`,
      },
    };
    const body = {
      source_url: "https://i.imgur.com/HSbk0eC.png",
      script: {
        type: "text",
        input: input,
        provider: {
          type: "microsoft",
          voice_id: "en-GB-SoniaNeural",
          voice_config: {
            style: "Cheerful",
          },
        },
      },
    };
    const apiRes = await needle("post", `${DID_URL}`, body, options);
    const data = apiRes.body;
    // log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`D-ID REQUEST: ${DID_URL}, ${body}, ${options}`);
    }
    res.status(200).setHeader("Access-Control-Allow-Origin", "*").json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// send id & get video url
router.get("/url", cache("60 minutes"), async (req, res) => {
  try {
    const id = req.query.id;
    const options = {
      headers: {
        accept: "application/json",
        authorization: `Basic ${DID_KEY_VALUE}`,
      },
    };
    const apiRes = await needle("get", `${DID_URL}/${id}`, options);
    const data = apiRes.body;
    // log the request to the public API
    if (process.env.NODE_ENV !== "production") {
      console.log(`D-ID REQUEST: ${DID_URL}, ${options}`);
    }
    res.status(200).setHeader("Access-Control-Allow-Origin", "*").json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;

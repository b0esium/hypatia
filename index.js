const express = require("express");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

// rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
});
app.use(limiter);
app.set("trust proxy", 1);

// set static folder
app.use(express.static(path.join(__dirname, "build")));

// routes
app.use("/openaiapi", require("./src/routes/openai"));
app.use("/did", require("./src/routes/did"));

// enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

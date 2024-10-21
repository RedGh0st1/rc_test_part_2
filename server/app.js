const express = require("express");
const jwt = require("jsonwebtoken");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const secretKey = process.env.JWT_SECRET;

// rate limiter entries
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per
  standardHeaders: true, //Enable standard rate limit headers
  message: "Too many requests, please try again later",
});

// implement cors(CSRF) protection
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(limiter);

const users = [
  {
    id: 1,
    username: "admin",
    password: "password",
  },
];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // looking for the user
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  //
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    ); //add token expiration

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/protected", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json({ message: "Welcome to the protected route!", decoded });
  });
});

app.get("/testing", (req, res) => {
  res.send("App is working!");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

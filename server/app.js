const express = require("express");
const jwt = require("jsonwebtoken");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const app = express();
const secretKey = process.env.JWT_SECRET;
const helmet = require("helmet");
const expirationTime = "1h";

// rate limiter entries
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per
  standardHeaders: true, //Enable standard rate limit headers
  message: "Too many requests, please try again later",
});

const allowedOrigin = "http://localhost:3000";
// implement cors(CSRF) protection
app.use(
  cors({
    origin: allowedOrigin, // allowing the frontend on localhost:3000
    methods: "GET, POST", // allowing these methods
    credentials: true, // alowing credentials
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(limiter);
app.use(cookieParser());
app.use(helmet());
const users = [
  {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("password", saltRounds),
  },
];

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // looking for the user
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: expirationTime }
    ); //add token expiration

    //HTTPonly.cookie
    res.cookie("token", token, {
      httpOnly: true, // Prevents access via Javascript
      secure: true, // ensure that cookies is sent over https
      sameSite: "strict", // add csrf protection
      maxAge: 3600000, // 1 hr
    });

    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/protected", (req, res) => {
  const token = req.cookies.token;
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

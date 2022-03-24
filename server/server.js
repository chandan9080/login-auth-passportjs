const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const cookieSession = require("cookie-session");
const initializePassportLocal = require("./config/passport");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
dotenv.config({ path: "./.env" });
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);
//middlewares
app.use(flash());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.db_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to Database"))
  .catch((err) => console.log("connection failed", err));

//cookies
app.use(
  cookieSession({
    name: "login",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
  })
);

//passport Config
initializePassportLocal(passport);
app.use(passport.session());
app.use(passport.initialize());

//
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

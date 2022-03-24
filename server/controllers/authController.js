const User = require("../models/user");
const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL;
//Error Handling
const handleErrorSignup = (err) => {
  let error = {
    email: "",
    password: "",
  };
  if (err.code === 11000) {
    error.email = "user with the given email exists";
  }
  return error;
};

module.exports.signup_get = (req, res) => {
  res.send("signup");
};
module.exports.login_get = (req, res) => {
  res.send("login");
};
//Login in user when user is already logged in
module.exports.login_succes = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "failed",
    });
  }
};
//Signup Post
module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    res.json({
      status: 201,
      user,
    });
  } catch (error) {
    const err = handleErrorSignup(error);
    res.json({ status: 400, err });
  }
};
//Login Post using passport
module.exports.login_post = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({
        status: 400,
        success: false,
        message: "Invalid email or password",
      });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({
        status: 200,
        message: info.message,
        username: req.user.name,
        useremail: req.user.email,
        useravatar: req.user.avatar,
      });
    });
  })(req, res, next);
};
module.exports.logout_post = (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
};
module.exports.google_get = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
});

module.exports.google_callback = passport.authenticate("google", {
  successRedirect: CLIENT_URL,
  failureRedirect: "/login/failed",
});

//for JWT authentication
/* const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(201).json({
      status: 201,
      user,
      token,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  } */

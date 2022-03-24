const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      lowercase: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "Email is required"],
      validate: [isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [8, "password must be at least 8 characters"],
    },
    role: {
      type: String,
      default: "Student",
    },
    provider: {
      type: String,
      default: "local",
    },
    avatar: {
      type: String,
      default: "../../assets/women.png",
    },
  },
  {
    timestamps: true,
  }
);
userSchema.post("save", (error, doc, next) => {
  console.log("new user was created and saved in the database", doc);
  next();
});

//hash the password before saving
userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});
//Static method to login the user
/* userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  console.log(user);
  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    } else {
      throw new Error("Invalid password");
    }
  }
  throw new Error("User with given Email does not exist");
};
 */
const User = mongoose.model("user", userSchema);
module.exports = User;

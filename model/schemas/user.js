const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { Subscription } = require("../../helpers/constants");

require("dotenv").config();
const saltRounds = Number(process.env.SALT_ROUNDS);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email required"],
      unique: true,
      validate(value) {
        const regEx = /\S+@\S+\.\S+/;

        return regEx.test(String(value).toLowerCase());
      },
    },
    password: {
      type: String,
      required: [true, "Password required"],
    },
    subscription: {
      type: String,
      enum: [Subscription.FREE, Subscription.PRO, Subscription.PREMIUM],
      default: Subscription.FREE,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(saltRounds);

  this.password = await bcrypt.hash(this.password, salt, null);

  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
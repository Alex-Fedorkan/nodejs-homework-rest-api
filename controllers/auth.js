const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const Users = require("../model/users");
const { HttpCode } = require("../helpers/constants");
const User = require("../model/schemas/user");
const EmailService = require("../services/email");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;

const register = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await Users.findByEmail(email);

    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: "error",
        code: HttpCode.CONFLICT,
        data: "Conflict",
        message: "Email in use",
      });
    }

    const verificationToken = uuid();

    const emailService = new EmailService(process.env.NODE_ENV);
    await emailService.sendEmail(verificationToken, email);

    const newUser = await User.create({ ...req.body, verificationToken });

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      data: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatarURL: newUser.avatarURL,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const verify = async (req, res, next) => {
  try {
    const user = await Users.findByVerifyToken(req.params.verificationToken);

    if (user) {
      await Users.updateVerifyToken(user.id, null);

      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        message: "Verification successful",
      });
    }

    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "User not found",
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findByEmail(email);

    if (
      !user ||
      !(await user.validPassword(password)) ||
      user.verificationToken
    ) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZED,
        data: "Unauthorized",
        message: "Email or password is wrong",
      });
    }

    const id = user._id;

    const payload = { id };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });

    await Users.updateToken(id, token);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  const userID = req.user.id;

  await Users.updateToken(userID, null);

  return res.status(HttpCode.NO_CONTENT).json({});
};

module.exports = { register, verify, login, logout };

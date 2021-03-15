const path = require("path");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { HttpCode, publicDir } = require("./helpers/constants");

const authRouter = require("./routes/api/auth/index");
const usersRouter = require("./routes/api/users/index");
const contactsRouter = require("./routes/api/contacts/index");

const app = express();

app.use(express.static(path.join(__dirname, publicDir)));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  handler: (req, res, next) => {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Too many requests, please try again later.",
    });
  },
});

app.use("/api/", apiLimiter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || HttpCode.INTERNAL_SERVER_ERROR)
    .json({ message: err.message });
});

module.exports = app;

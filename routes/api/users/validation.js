const Joi = require("joi");
const { Subscription, HttpCode } = require("../../../helpers/constants");

const schemaUpdateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.FREE, Subscription.PRO, Subscription.PREMIUM)
    .required(),
});

const validate = (schema, object, next) => {
  const { error } = schema.validate(object);

  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Filed: ${message.replace(/"/g, "")}`,
    });
  }

  next();
};

module.exports.updateSubscription = (req, res, next) => {
  return validate(schemaUpdateSubscription, req.body, next);
};

module.exports.updateAvatar = (req, res, next) => {
  if (!req.file) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      data: "Bad request",
      message: "Field of avatar with file not found.",
    });
  }

  next();
};

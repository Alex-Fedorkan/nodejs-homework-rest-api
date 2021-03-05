const Joi = require("joi");
const { Subscription, HttpCode } = require("../../../helpers/constants");

const schemaUpdate = Joi.object({
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

module.exports.update = (req, res, next) => {
  return validate(schemaUpdate, req.body, next);
};

const Joi = require("joi");
const { HttpCode, Subscription } = require("../../../helpers/constants");

const phoneRegEx = /\+?([0-9]*)([ .-]?)\(?([0-9]{3})\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{2})([ .-]?)([0-9]{2})/;

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(3).max(18).pattern(phoneRegEx).required(),
  owner: Joi.string(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(2).max(40).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().min(3).max(18).pattern(phoneRegEx).optional(),
  owner: Joi.string(),
});

const schemaGetAllContacts = Joi.object({
  page: Joi.number().integer().greater(0).optional(),
  limit: Joi.number().integer().greater(0).optional(),
  sub: Joi.string()
    .valid(Subscription.FREE, Subscription.PRO, Subscription.PREMIUM)
    .optional(),
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

module.exports.addContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next);
};

module.exports.updateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next);
};

module.exports.getAll = (req, res, next) => {
  return validate(schemaGetAllContacts, req.query, next);
};

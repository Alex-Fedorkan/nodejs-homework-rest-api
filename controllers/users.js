const { findByToken, findByTokenAndUpdate } = require("../model/users");
const { HttpCode } = require("../helpers/constants");

const currentUser = async (req, res, next) => {
  try {
    const [, token] = req.get("Authorization").split(" ");

    const user = await findByToken(token);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const [, token] = req.get("Authorization").split(" ");

    const user = await findByTokenAndUpdate(token, req.body);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { currentUser, updateSubscription };

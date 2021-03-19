const User = require("./schemas/user");

const findByEmail = async (email) => {
  return await User.findOne({ email });
};

const findByID = async (id) => {
  return await User.findOne({ _id: id });
};

const findByToken = async (token) => {
  return await User.findOne({ token });
};

const findByTokenAndUpdate = async (token, body) => {
  return await User.findOneAndUpdate({ token }, { ...body }, { new: true });
};

const findByVerifyToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const create = async ({ email, password, verificationToken }) => {
  const user = new User({ email, password, verificationToken });

  return await user.save();
};

const updateToken = async (id, token) => {
  return await User.updateOne({ _id: id }, { token });
};

const updateAvatar = async (id, avatar) => {
  return await User.updateOne({ _id: id }, { avatarURL: avatar });
};

const updateVerifyToken = async (id, verificationToken) => {
  return await User.findOneAndUpdate({ _id: id }, { verificationToken });
};

module.exports = {
  findByEmail,
  findByID,
  findByToken,
  findByTokenAndUpdate,
  findByVerifyToken,
  create,
  updateToken,
  updateAvatar,
  updateVerifyToken,
};

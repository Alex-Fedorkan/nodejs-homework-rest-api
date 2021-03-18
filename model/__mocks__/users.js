const { users } = require("./data");

const findByEmail = (email) => {};

const findByID = (id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));

  return user;
};

const findByToken = (token) => {};

const findByTokenAndUpdate = (token, body) => {};

const create = ({ email, password }) => {};

const updateToken = (id, token) => {
  return {};
};

const updateAvatar = (id, avatar) => {
  let [user] = users.filter((el) => String(el._id) === String(id));

  console.log("mock");

  if (user) {
    user = { ...user, avatarURL: avatar };
  }

  return user;
};

module.exports = {
  findByEmail,
  findByID,
  findByToken,
  findByTokenAndUpdate,
  create,
  updateToken,
  updateAvatar,
};

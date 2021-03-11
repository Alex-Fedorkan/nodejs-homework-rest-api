const fs = require("fs").promises;
const path = require("path");
const Jimp = require("jimp");
const {
  findByToken,
  findByTokenAndUpdate,
  updateAvatar,
} = require("../model/users");
const { HttpCode } = require("../helpers/constants");
const { publicDir, avatarsOfUsers } = require("../helpers/constants");

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
        avatarURL: user.avatarURL,
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

const saveAvatarToStatic = async (req) => {
  const pathFile = req.file.path;
  const newNameAvatar = `${Date.now()}-${req.file.originalname}`;

  const img = await Jimp.read(pathFile);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(pathFile);

  await fs.rename(
    pathFile,
    path.join(publicDir, avatarsOfUsers, newNameAvatar)
  );

  const avatarURL = path.normalize(path.join(avatarsOfUsers, newNameAvatar));

  try {
    await fs.unlink(path.join(process.cwd(), publicDir, req.user.avatarURL));
  } catch (e) {
    console.log(e.message);
  }

  return avatarURL;
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id;

    const avatarURL = await saveAvatarToStatic(req);

    await updateAvatar(id, avatarURL);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        avatarURL,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = { currentUser, updateSubscription, avatars };

const express = require("express");
const router = express.Router();
const usersController = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const upload = require("../../../helpers/upload");
const { updateSubscription, updateAvatar } = require("./validation");

router.patch(
  "/",
  [guard, updateSubscription],
  usersController.updateSubscription
);

router.get("/current", guard, usersController.currentUser);

router.patch(
  "/avatars",
  [guard, upload.single("avatar"), updateAvatar],
  usersController.avatars
);

module.exports = router;

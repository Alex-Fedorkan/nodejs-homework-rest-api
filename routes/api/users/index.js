const express = require("express");
const router = express.Router();
const {
  currentUser,
  updateSubscription,
} = require("../../../controllers/users");
const guard = require("../../../helpers/guard");
const { update } = require("./validation");

router.patch("/", guard, update, updateSubscription);

router.get("/current", guard, currentUser);

module.exports = router;

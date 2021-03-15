const express = require("express");
const router = express.Router();
const contactsController = require("../../../controllers/contacts");
const { addContact, updateContact, getAll } = require("./validation");
const guard = require("../../../helpers/guard");

router
  .post("/", [guard, addContact], contactsController.create)
  .get("/", [guard, getAll], contactsController.getAll);

router
  .get("/:contactId", guard, contactsController.getByID)
  .patch("/:contactId", [guard, updateContact], contactsController.update)
  .delete("/:contactId", guard, contactsController.remove);

module.exports = router;

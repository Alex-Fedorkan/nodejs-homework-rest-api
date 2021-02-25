const express = require("express");
const router = express.Router();
const contactsController = require("../../controllers/contacts");
const { addContact, updateContact } = require("./validation");

router
  .post("/", addContact, contactsController.create)
  .get("/", contactsController.getAll);

router
  .get("/:contactId", contactsController.getByID)
  .patch("/:contactId", updateContact, contactsController.update)
  .delete("/:contactId", contactsController.remove);

module.exports = router;

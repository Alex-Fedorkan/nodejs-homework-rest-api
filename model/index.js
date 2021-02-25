const Contact = require("./schemas/contact");

const addContact = async (body) => {
  return await Contact.create(body);
};

const listContacts = async () => {
  return await Contact.find({});
};

const getContactById = async (contactID) => {
  return await Contact.findOne({ _id: contactID });
};

const updateContact = async (contactID, body) => {
  return await Contact.findByIdAndUpdate(
    { _id: contactID },
    { ...body },
    { new: true }
  );
};

const removeContact = async (contactID) => {
  return await Contact.findByIdAndRemove({ _id: contactID });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

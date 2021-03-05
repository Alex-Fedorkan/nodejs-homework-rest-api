const Contact = require("./schemas/contact");

const addContact = async (body) => {
  return await Contact.create(body);
};

const listContacts = async (userID, { page = 1, limit = 5, sub }) => {
  console.log({ ...(sub ? { subscription: sub } : {}) });

  const result = await Contact.paginate(
    // ...(sub ? { subscription: sub } : {}),
    { ...(sub ? { subscription: sub } : {}), owner: userID },
    {
      page,
      limit,
      populate: {
        path: "owner",
        select: "email, subscription",
      },
    }
  );

  const { docs: contacts, totalDocs: total } = result;

  return { total, page, limit, contacts };
};

const getContactById = async (contactID, userID) => {
  return await (
    await Contact.findOne({ _id: contactID, owner: userID })
  ).populate({
    path: "owner",
    select: "email, subscription",
  });
};

const updateContact = async (contactID, body, userID) => {
  return await Contact.findOneAndUpdate(
    { _id: contactID, owner: userID },
    { ...body },
    { new: true }
  );
};

const removeContact = async (contactID, userID) => {
  return await Contact.findOneAndRemove({ _id: contactID, owner: userID });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

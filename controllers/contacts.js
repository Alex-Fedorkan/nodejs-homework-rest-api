const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model/index");

const create = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    return res.status(201).json({
      status: "success",
      code: 201,
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const contacts = await listContacts();

    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getByID = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing fields",
    });
  }

  try {
    const contact = await updateContact(req.params.contactId, req.body);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);

    if (contact) {
      return res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { create, getAll, getByID, update, remove };

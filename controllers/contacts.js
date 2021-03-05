const { HttpCode } = require("../helpers/constants");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../model/contacts");

const create = async (req, res, next) => {
  try {
    const userID = req.user.id;

    const contact = await addContact({ ...req.body, owner: userID });

    return res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
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
    const userID = req.user.id;

    const contacts = await listContacts(userID, req.query);

    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      data: {
        ...contacts,
      },
    });
  } catch (e) {
    next(e);
  }
};

const getByID = async (req, res, next) => {
  try {
    const userID = req.user.id;

    const contact = await getContactById(req.params.contactId, userID);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: "Missing fields",
    });
  }

  try {
    const userID = req.user.id;

    const contact = await updateContact(req.params.contactId, req.body, userID);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

const remove = async (req, res, next) => {
  try {
    const userID = req.user.id;

    const contact = await removeContact(req.params.contactId, userID);

    if (contact) {
      return res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
      });
    } else {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Not found",
      });
    }
  } catch (e) {
    next(e);
  }
};

module.exports = { create, getAll, getByID, update, remove };

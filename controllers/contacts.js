const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers');

const getAll = async (_, res) => {
  const result = await contacts.getAll();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await contacts.updateContact({ id, name, email, phone });
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.deleteContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json({
    message: 'Delete success',
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  geById: ctrlWrapper(getContactById),
  add: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateContactById),
  deleteById: ctrlWrapper(deleteContactById),
};

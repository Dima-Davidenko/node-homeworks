const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

const updateContacts = async contacts =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const contact = allContacts.find(item => item.id === contactId);
  return contact ? contact : null;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const indexToDelete = allContacts.findIndex(item => item.id === contactId);
  if (indexToDelete === -1) {
    return null;
  }
  allContacts.splice(indexToDelete, 1);
  updateContacts(allContacts);
  return allContacts;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  allContacts.push(newContact);
  updateContacts(allContacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// const contactsService = require("../models/contacts");
const { ctrlWrapper } = require("../decorators");
const {contactWithSchema} = require("../schemas/contacts-schemas");

const listContacts = async (req, res) => {
  const result = await contactWithSchema.find();
  res.json(result);
}

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactWithSchema.findOne(contactId);
  if (!result) {
    return res.status(404).json({
      message: `Client with ID: ${contactId} not found`
    });
}
  res.json(result);  
}

const addContact = async (req, res) => {
  const result = await contactWithSchema.create(req.body);
  if (!result) {
    return res.status(400).json({
      message: `Missing required name field`
    });
  }  
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactWithSchema.findByIdAndDelete(contactId);
  if (!result) {
    return res.status(404).json({
      message: `Client with ID: ${contactId} not found`
    });
  }  
  res.json({
    message: "Сontact deleted"
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactWithSchema.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    return res.status(400).json({
      message: `Missing fields`
    });
  }
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
}
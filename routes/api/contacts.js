const express = require('express');
const contactsController = require('../../controllers/contacts-controller');
const schemas = require('../../schemas/contacts-schemas');
const { validateBody } = require('../../decorators');
const router = express.Router();

router.get('/', contactsController.listContacts);

router.get('/:contactId', contactsController.getContactById);

router.post("/", validateBody(schemas.contactAddSchema),contactsController.addContact);

router.delete('/:contactId', contactsController.removeContact);

router.put('/:contactId', validateBody(schemas.contactAddSchema),contactsController.updateContact);

module.exports = router;

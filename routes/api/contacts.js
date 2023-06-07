const express = require("express");
const {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
} = require("../../controllers/contacts-controller");
const {
    contactWithSchema,
    updateFavoriteSchema
} = require("../../schemas/contacts-schemas");
const { validateBody } = require("../../decorators");
const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", validateBody(contactWithSchema), addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", validateBody(updateFavoriteSchema), updateContact);

module.exports = router;
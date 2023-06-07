const express = require("express");
const ctrl = require("../../controllers/contacts-controller");
const { schemas } = require("../../schemas/contacts-schemas");
const { isValidId, validateBody } = require("../../decorators");
const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", validateBody(schemas.contactAddSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, validateBody(schemas.contactAddSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.contactAddSchema), ctrl.updateFavorite);

module.exports = router;
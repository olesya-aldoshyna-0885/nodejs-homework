const {ctrlWrapper} = require("./ctrlWrapper");
const {validateBody} = require("./validateBody");
const {isValidId} = require("./isValidId");
const {authenticate} = require("./authenticate");
const {upload} = require("./upload");
const {sendEmail} = require("./sendEmail");
module.exports = {
    ctrlWrapper,
    validateBody,
    isValidId,
    authenticate,
    upload,
    sendEmail
}
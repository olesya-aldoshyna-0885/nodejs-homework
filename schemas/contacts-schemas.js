const Joi = require('joi');

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing fields`
    }),
    email: Joi.string().required().messages({
        "any.required": `missing fields`
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing fields`
    }),
});

module.exports = {
    contactAddSchema,
};
const Joi = require("joi");
const { model, Schema } = require("mongoose");

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

const schemaContact = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
        required: [true, 'Set email for contact'],
    },
    phone: {
        type: String,
        required: [true, 'Set phone for contact'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true,
        versionKey: false,
    });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactWithSchema = model("schemaContact", schemaContact);

const schemas = { contactAddSchema, updateFavoriteSchema };

module.exports = {
    contactAddSchema,
    contactWithSchema,
    schemas
};
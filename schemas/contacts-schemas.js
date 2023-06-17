const Joi = require("joi");
const { model, Schema } = require("mongoose");
const { handleMongooseError } = require('../decorators/handleMongooseError');

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
},
    {
        timestamps: true,
        versionKey: false,
    });

schemaContact.post("save", handleMongooseError);

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
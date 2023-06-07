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

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
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
        match: /^[A-Z]{1,1}[a-zA-Z0-9\s]+$/,
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

const contactWithSchema = model("schemaContact", schemaContact);

// create a new contact object
// const res = await contactWithSchema.create({
//     name: "Olesya",
//     email: "Olesya@gmail.com",
//     phone: "0966444444",
//     favorite: true,
// })
//     console.log(res.name);
    
// find all contacts
    // const res = contactWithSchema.find()
    // console.log(res.length);

// find by name
    // const res = await contactWithSchema.find({ name: "Olesya" });
    // console.log(res);

// find by id
    // const res = contactWithSchema.findOne({_id: "647dc68e8847b3f85502001f"});
    // console.log(res)
// update contacts
    // const result = await contactWithSchema.findByIdAndUpdate("647db08f238c37f9088a11eb", {
    //     name: "Sasha",
    //     favorite: false
    // });
    // console.log(result)
    // const res = await contactWithSchema.findByIdAndDelete("647db08f238c37f9088a11eb");
    //     console.log(res);

module.exports = {
    contactAddSchema,
    contactWithSchema,
    updateFavoriteSchema
};
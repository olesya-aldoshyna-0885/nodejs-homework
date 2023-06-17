const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleMongooseError } = require('../decorators/handleMongooseError');

const emailRegexp = /^[A-Z]([a-zA-Z]+\s?)+$/;

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    match: emailRegexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: "",
    },
},
    {
        timestamps: true,
        versionKey: false,
  });
  
userSchema.post("save", handleMongooseError);

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  userRegisterSchema,
  userLoginSchema 
}

const User = model('user', userSchema);

module.exports = {
  User,
  schemas
}
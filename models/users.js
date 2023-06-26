const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../decorators/handleMongooseError');

// const emailRegexp = /^[A-Z]([a-zA-Z]+\s?)+$/;

const userSchema = new Schema({
  password: {
    type: String,
    minlength: 6,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    // match: emailRegexp,
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
  avatarURL: {
    type: String,
    required: true,
  },
},
    {
        timestamps: true,
        versionKey: false,
  });
  
userSchema.post("save", handleMongooseError);

const User = model('user', userSchema);

module.exports = {
  User
}
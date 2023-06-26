const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require("path");
const fs = require("fs/promises");
const { User } = require('../models/users')
const { SECRET_KEY } = process.env;
const { ctrlWrapper } = require("../decorators");
const gravatar = require('gravatar');

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res, next) => {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
        if (currentUser != null) {
            return res.status(409).json({ message: "Email already in use" });
        }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
        
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});
    
    return res.status(201).json({
        email: newUser.email,
        name: newUser.name,
        });
}

const login = async (req, res) => { 
    const { email, password } = req.body;
   
    const user = await User.findOne({ email });   
    if (!user) {
        return res.status(401).json({ error: "Email or password is wrong" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) { 
        return res.status(401).json({ error: "Email or password is wrong" });
    }

    const { _id: id } = user;
    const payload = {
        id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h"});
    await User.findByIdAndUpdate(id, { token });

    res.json({ token });
}

const getCurrent = async (req, res) => { 
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    })
}

const logout = async (req, res) => { 
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    
    res.status(204).json({
        message: "No Content"
    });
}

const updateAvatar = async (req, res) => { 
    const {_id} = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({
        avatarUrl
    })
};

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar)
};
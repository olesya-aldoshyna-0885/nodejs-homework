const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user')
const { SECRET_KEY } = process.env;
const { ctrlWrapper } = require("../decorators");

async function register (req, res, next) {
 const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const currentUser = await User.findOne({ email: newUser.email });
        if (currentUser !== null) {
            return res.status(409).json({ message: "Email in use" });
        }
        
        newUser.password = await bcrypt.hash(newUser.password, 10);
        
        await User.create(newUser);
        return res.status(201).end();
    } catch (error) {
        return next(error);
    }
}

async function login(req, res, next) { 
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });   
        if (user === null) {
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

    } catch (error) {
        return next(error);
    }
}

async function getCurrent(req, res) { 
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    })
}

async function logout(req, res) { 
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    
    res.status(204).json({
        message: "No Content"
    });
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
};
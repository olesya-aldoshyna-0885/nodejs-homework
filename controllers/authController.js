const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs/promises");
const { User } = require("../models/users")
const { SECRET_KEY} = process.env;
const { ctrlWrapper, sendEmail } = require("../decorators");
const gravatar = require('gravatar');
const Jimp = require("jimp");
const { nanoid } = require("nanoid");
const { cloudinary } = require("../helpers/cloudinary");

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
    const { email, password } = req.body;
    const verificationToken = nanoid();
    const currentUser = await User.findOne({ email });
        if (currentUser != null) {
            return res.status(409).json({ message: "Email already in use" });
        }
    const hashPassword = await bcrypt.hash(password, 10);
    
    const avatarURL = gravatar.url(email);
        
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken
    });
    
    await sendEmail(email, verificationToken);

    const { _id: id } = newUser;
    const payload = {
        id,
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

    return res.status(201).json({
        token,
        user: {
            email: newUser.email,
            name: newUser.name,
        }
        });
}

const verify = async (req, res) => { 
    const { verificationToken } = req.params; 
    const user = await User.findOne({ verificationToken }); 
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });
    res.json({
        message: "Verification successful"
    });
}   

const resendVerifyEmail = async (req, res) => { 
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        return res.status(404).json({ error: "Email not found" });
    }
    if (user.verify) {
        return res.status(400).json({ error: "Email already verify" });
    }

    await sendEmail(email, user.verificationToken);

     res.json({
        message: "Verify email send"
    })
    }


const login = async (req, res) => { 
    const { email, password } = req.body;   
    const user = await User.findOne({ email });   
    if (!user) {
        return res.status(401).json({ error: "Email or password is wrong" });
    }
    if (!user.verify) {
        return res.status(401).json({ error: "Email not verified" });
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

    res.json({
        token,
        user: {
            email: user.email,
            name: user.name,
            subscription: user.subscription
        }
    });
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

const resizeAvatar = async (url, filename) => {    
  const image = await Jimp.read(url);
  await image.resize(250, 250).writeAsync(url);
};

// const updateAvatar = async (req, res) => { 
//     const {_id} = req.user;
//     const { path: tempUpload } = req.file;
//     // const filename = `${_id}_${originalname}`;
//     // const resultUpload = path.join(avatarsDir, filename);
//     await resizeAvatar(tempUpload);
//     // await fs.rename(tempUpload, resultUpload);
//     // const avatarUrl = path.join('avatars', filename);
//     const avatarUrl = await cloudinary.uploader.upload(tempUpload, {
//         folder: "avatars"
//     })
//     await fs.unlink(avatarUrl);
//     await User.findByIdAndUpdate(_id, { avatarUrl });

//     res.json({
//         avatarUrl
//     })
// };

const updateAvatar = async (req, res) => { 
    const {_id} = req.user;
    const { path: tempUpload, originalname } = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await resizeAvatar(tempUpload);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, { avatarUrl });

    res.json({
        avatarUrl
    })
};

module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar)
};
const express = require('express');
const authController = require('../../controllers/authController');
const { authenticate, validateBody, upload } = require('../../decorators');
const { schemas } = require('../..//schemas/users-schemas');
const router = express.Router();
  
router.post('/register', validateBody(schemas.userRegisterSchema), authController.register);
router.get('/verify/:verificationToken', authController.verify);
router.post('/verify', validateBody(schemas.userEmailSchema), authController.resendVerifyEmail);
router.post('/login', validateBody(schemas.userLoginSchema), authController.login);
router.get('/current', authenticate, authController.getCurrent);
router.post('/logout', authenticate, authController.logout);
router.patch('/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);

module.exports = router;
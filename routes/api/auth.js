const express = require('express');
const AuthController = require('../../controllers/authController');
const { authenticate } = require('../../decorators/authenticate');
const { schemas } = require('../../models/user');
const { validateBody } = require('../../decorators');
const router = express.Router();
  
router.post('/register', validateBody(schemas.userRegisterSchema), AuthController.register);
router.post('/login',  validateBody(schemas.userLoginSchema), AuthController.login);
router.get("/current", authenticate, AuthController.getCurrent);
router.post('/logout', authenticate, AuthController.logout);

module.exports = router;
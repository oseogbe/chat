const express = require("express");
const AuthController = require("../../controllers/v1/auth.controller");

const authController = new AuthController();

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;

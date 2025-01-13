const express = require("express");
const UserController = require("../../controllers/v1/user.controller");
const authenticate = require("../../middlewares/authenticate");

const userController = new UserController();

const router = express.Router();

router.get("/get-contacts", authenticate, userController.getContactList);
router.get("/search", authenticate, userController.search);
router.get("/get-details/:userId", authenticate, userController.getUserDetails);

module.exports = router;

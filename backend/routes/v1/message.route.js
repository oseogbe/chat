const express = require("express");
const MessageController = require("../../controllers/v1/message.controller");
const authenticate = require("../../middlewares/authenticate");

const messageController = new MessageController();

const router = express.Router();

router.post("/save", authenticate, messageController.saveMessage);
router.get("/fetch", authenticate, messageController.fetchMessages);

module.exports = router;

const express = require("express");
const ChatRequestController = require("../../controllers/v1/chat-request.controller");
const authenticate = require("../../middlewares/authenticate");

const chatRequestController = new ChatRequestController();

const router = express.Router();

router.get("/all", authenticate, chatRequestController.getAllChatRequests);
router.post("/send", authenticate, chatRequestController.sendChatRequest);
router.post(
  "/update-status",
  authenticate,
  chatRequestController.updateChatRequestStatus
);

module.exports = router;

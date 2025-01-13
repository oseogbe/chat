const { prisma } = require("../../lib/prisma");

class ChatRequestController {
  async sendChatRequest(req, res) {
    const senderId = req.user.userId;
    const { receiverId } = req.body;

    try {
      const existingRequest = await prisma.chatRequest.findFirst({
        where: {
          senderId,
          receiverId,
          status: "PENDING",
        },
      });

      if (existingRequest) {
        return res.status(400).json({
          success: false,
          message: "A pending chat request already exists.",
        });
      }

      await prisma.chatRequest.create({
        data: {
          senderId,
          receiverId,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Chat request sent!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateChatRequestStatus(req, res) {
    const { requestId, status } = req.body;

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Only ACCEPTED or REJECTED are allowed.",
      });
    }

    try {
      const chatRequest = await prisma.chatRequest.update({
        where: { id: requestId },
        data: { status },
      });

      return res.status(200).json({
        success: true,
        data: chatRequest,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = ChatRequestController;

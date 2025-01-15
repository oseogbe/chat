const { prisma } = require("../../lib/prisma");

class ChatRequestController {
  async getAllChatRequests(req, res) {
    const { status } = req.query;

    const filter = {
      OR: [
        {
          senderId: req.user.userId,
        },
        {
          receiverId: req.user.userId,
        },
      ],
    };

    if (status) {
      if (!["PENDING", "ACCEPTED", "REJECTED"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status.",
        });
      }
      filter.status = status;
    }

    try {
      const chatRequests = await prisma.chatRequest.findMany({
        where: filter,
        include: {
          sender: true,
          receiver: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json({
        success: true,
        data: chatRequests,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async sendChatRequest(req, res) {
    const senderId = req.user.userId;
    const { receiverId } = req.body;

    try {
      const existingRequest = await prisma.chatRequest.findFirst({
        where: {
          senderId,
          receiverId,
          status: {
            in: ["PENDING", "ACCEPTED"],
          },
        },
      });

      if (existingRequest) {
        if (existingRequest.status === "PENDING") {
          return res.status(400).json({
            success: false,
            message: "A pending chat request already exists.",
          });
        }

        if (existingRequest.status === "ACCEPTED") {
          return res.status(400).json({
            success: false,
            message: "Contact has already been added.",
          });
        }
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

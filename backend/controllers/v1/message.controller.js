const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class MessageController {
  async saveMessage(req, res) {
    const { senderId, receiverId, content } = req.body;

    try {
      const message = await prisma.message.create({
        data: {
          senderId,
          receiverId,
          content,
        },
      });

      return res.status(200).json({
        success: true,
        message,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  async fetchMessages(req, res) {
    const userId = req.user.userId;
    const { chatUserId } = req.query;

    try {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: userId, receiverId: chatUserId },
            { senderId: chatUserId, receiverId: userId },
          ],
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return res.status(200).json({
        success: true,
        messages,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = MessageController;

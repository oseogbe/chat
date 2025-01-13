const { prisma } = require("../../lib/prisma");

class UserController {
  async getContactList(req, res) {
    try {
      const userId = req.user.userId;
      const contacts = await prisma.user.findMany({
        where: {
          OR: [
            {
              sentChatRequests: {
                some: { receiverId: userId, status: "ACCEPTED" },
              },
            },
            {
              receivedChatRequests: {
                some: { senderId: userId, status: "ACCEPTED" },
              },
            },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          image: true,
        },
      });
      res.status(200).json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async search(req, res) {
    try {
      const { query } = req.query;
      const userId = req.user.userId; // Get the authenticated user's ID
      const users = await prisma.user.findMany({
        where: {
          AND: [
            {
              id: { not: userId }, // Exclude the authenticated user
            },
            {
              OR: [
                { email: { contains: query, mode: "insensitive" } },
                { phoneNumber: { contains: query, mode: "insensitive" } },
              ],
            },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          image: true,
        },
      });
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getUserDetails(req, res) {
    try {
      const userId = req.params.userId;
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
          image: true,
        },
      });
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = UserController;

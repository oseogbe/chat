const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../lib/prisma");

class AuthController {
  async register(req, res) {
    const { name, email, password, phoneNumber } = req.body;

    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { phoneNumber }],
        },
      });

      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Email or phone number already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name,
          email,
          hashedPassword,
          phoneNumber,
        },
      });

      res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ userId: user.id, token });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = AuthController;

const { PrismaClient } = require("@prisma/client");

// Use a global variable to store the Prisma client instance
const globalForPrisma = global;

// Create a new Prisma client instance if one doesn't already exist
const prisma = globalForPrisma.prisma || new PrismaClient({ log: ["query"] });

// In development mode, store the Prisma client instance in the global variable
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Export the Prisma client instance for use in other parts of the application
module.exports = { prisma };

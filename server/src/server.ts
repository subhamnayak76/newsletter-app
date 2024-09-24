import express, { Express, Response, Request, NextFunction } from "express";
import { createHealthRouter } from "./routes/health";
import { createNewsletterRouter } from "./routes/newsletter/index"
import { PrismaClient } from "@prisma/client";
interface CreateServerParams {
  prisma: PrismaClient;
}
import cors from "cors";
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('Error:', error);

  res.status(500).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
};

// the server singleton
let server: Express;

export const createServer = ({prisma}:CreateServerParams): Express => {
  if (server) return server;

  server = express();

  // middleware setup
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use("/v1", createHealthRouter());
  server.use("/v1", createNewsletterRouter(prisma));

  server.use((req, res, next) => {
    console.log('Received request:', req.method, req.path);
    console.log('Request body:', req.body);
    next();
  });

  server.use(errorHandler);

  return server;
};

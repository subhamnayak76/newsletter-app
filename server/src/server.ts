import express, { Express, Response, Request, NextFunction } from "express";
import { createHealthRouter } from "./routes/health";
import { createNewsletterRouter } from "./routes/newsletter/index"
import cors from "cors";
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error caught in errorHandler:");
  console.error(error);
  console.error("Request path:", req.path);
  console.error("Request method:", req.method);
  console.error("Request headers:", req.headers);
  console.error("Request body:", req.body);

  res.status(500).json({
    status: false,
    message: error.message || "Internal Server Error",
  });
};

// the server singleton
let server: Express;

export const createServer = (): Express => {
  if (server) return server;

  server = express();

  // middleware setup
  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use("/v1", createHealthRouter());
  server.use("/v1", createNewsletterRouter());

  server.use((req, res, next) => {
    console.log('Received request:', req.method, req.path);
    console.log('Request body:', req.body);
    next();
  });

  server.use(errorHandler);

  return server;
};

import { PrismaClient } from "@prisma/client";
import { createServer } from "./server";
import { TestPubSub } from "./service/pubsub/test-pubsub";
import { GooglePubSubService } from "./service/pubsub/gcp";
import { GoogleAuth } from 'google-auth-library';

const auth = new GoogleAuth({
  keyFilename: 'C:\Users\DELL\Downloads\sturdy-now-436808-c9-5cb6bdf37257.json'
});
const PORT = process.env.PORT || 8080;
const prisma = new PrismaClient();
console.log('GCP_PROJECT_ID:', process.env.GCP_PROJECT_ID);

const pubSub =  new GooglePubSubService(process.env.GCP_PROJECT_ID || "");
const server = createServer({prisma,pubSub}).listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: Error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

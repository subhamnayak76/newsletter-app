import express from "express";
import { SignupHandler } from "./signup";
import { PrismaClient } from "@prisma/client";
import { PubSubService } from "../../service/pubsub/type";

export const createNewsletterRouter = (prisma : PrismaClient,pubSub:PubSubService) => {
    const newsletterRouter = express.Router();
    newsletterRouter.post("/newsletter/signup", SignupHandler(prisma,pubSub));
    return newsletterRouter;
}  
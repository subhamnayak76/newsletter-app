import express from "express";
import { SignupHandler } from "./signup";
import { PrismaClient } from "@prisma/client";

export const createNewsletterRouter = (prisma : PrismaClient) => {
    const newsletterRouter = express.Router();
    newsletterRouter.post("/newsletter/signup", SignupHandler(prisma));
    return newsletterRouter;
}  
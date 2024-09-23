import express from "express";
import { SignupHandler } from "./signup";

export const createNewsletterRouter = () => {
    const newsletterRouter = express.Router();
    newsletterRouter.post("/newsletter/signup", SignupHandler());
    return newsletterRouter;
}  
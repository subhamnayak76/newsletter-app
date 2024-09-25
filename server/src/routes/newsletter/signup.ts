
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { isEmailValid } from '../../utlis/email';
import { PrismaClient } from '@prisma/client';
import { upsertSubscriber } from '../../service/newsletter/newsletter';
import { ErrorCode } from '../../error/error';

interface SignupPayload {
    email?: string;
}

export const SignupHandler = (prisma: PrismaClient) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Received signup request:", req.body);
        const { email = "" } = req.body as SignupPayload;

        if (!email) {
            throw new ErrorCode("ERR-001", "Email");
        }

        if (!isEmailValid(email)) {
            throw new ErrorCode("ERR-002", "Email");
        }

        console.log("Email is valid:", email);
        const newsletterSubscriber = await upsertSubscriber(prisma, email);
        console.log("signupHandler: Signup is successful");
        return res.status(httpStatus.CREATED).json(newsletterSubscriber);
    } catch (error: unknown) {
        if (!(error instanceof ErrorCode)) {
            console.log("signupHandler:", error);
            throw new Error(String(error));
        }

        if (["ERR-001", "ERR-002"].includes(error.code)) {
            return res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
};
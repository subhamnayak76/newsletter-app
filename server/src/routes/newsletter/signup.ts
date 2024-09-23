import { Request, Response, NextFunction } from 'express';
import { isEmailValid } from '../../utlis/email';

interface SignupPayload {
    email?: string;
}

export const SignupHandler = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Received signup request:", req.body);
        const { email = "" } = req.body as SignupPayload;

        if (!email.trim()) {
            console.log("Email is empty");
            return res.status(400).json({
                status: false,
                message: "Email is required"
            });
        }

        if (!isEmailValid(email)) {
            console.log("Invalid email:", email);
            return res.status(400).json({
                status: false,
                message: "Invalid email, please try again."
            });
        }

        console.log("Email is valid:", email);
        // Here you would typically save the email to your database
        // For now, we'll just simulate a successful registration

        return res.status(200).json({
            status: true,
            message: "Email has been successfully registered."
        });
    } catch (error) {
        console.error("Error in SignupHandler:", error);
        next(error); // Pass the error to the error handling middleware
    }
};
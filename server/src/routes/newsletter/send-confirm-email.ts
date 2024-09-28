import { Request, Response } from "express";
import { isPubSubPayload } from "../../service/pubsub/gcp";
import { ErrorCode } from "../../error/error";
import httpStatus from "http-status";

export const sendConfirmEmailHandler = async (request: Request, response: Response) => {
  try {
    const { body } = request;

    if (!isPubSubPayload(body)) {
      return response.status(httpStatus.BAD_REQUEST).json({ error: "Invalid payload structure" });
    }

    const {
      message: { data: encodedJsonObject },
    } = body;

    const parsedBuffer = Buffer.from(encodedJsonObject as string, "base64").toString("ascii");
    const parsedPayload = JSON.parse(parsedBuffer);

    console.log("sendConfirmEmailHandler: ", parsedPayload); // Added detailed log for the parsed payload

    // Placeholder for sending email logic
    return response.status(httpStatus.OK).json({ message: "Confirmation email sent successfully" });
  } catch (error) {
    console.error("Error in sendConfirmEmailHandler: ", error); // Log error if any
    return response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "Failed to send confirmation email" });
  }
};

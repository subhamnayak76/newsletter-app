import { NODE_ENV } from "../../utlis/constant";
import { PubSubService } from "./type";
import { PubSub } from "@google-cloud/pubsub";
import { GoogleAuth } from "google-auth-library";

export interface GCPPubSubPayload {
  message: {
    attributes: string[];
    data: Buffer | string;
    message_id: string;
  };
  subscription: string;
}

export function isPubSubPayload(body: Record<string, any>): body is GCPPubSubPayload {
  return Boolean(body?.subscription && body?.message?.data);
}

export class GooglePubSubService implements PubSubService {
  private client: PubSub;

  constructor(private projectId: string, private auth?: GoogleAuth) {
    console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS); // Log the credentials path

    this.client = new PubSub({
      projectId: this.projectId,
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Explicitly use the key file path
    });
  }

  static preparePublishPayload(payload: Record<string, unknown>): Buffer {
    const objectAsString = JSON.stringify(payload);
    return Buffer.from(objectAsString);
  }

  async checkIfTopicExists(topicName: string) {
    const [topicList] = await this.client.getTopics();
    return !!topicList.find((it) => it.name === topicName);
  }

  async publish(topicId: string, payload: Record<string, unknown>): Promise<string> {
    try {
      const topicName = `projects/${this.projectId}/topics/${topicId}-${NODE_ENV}`;
      console.log("Publishing to topic:", topicName); // Log topic name

      const exists = await this.checkIfTopicExists(topicName);
      if (!exists) {
        throw new Error(`Topic: ${topicName} does not exist in the project ${this.projectId}`);
      }

      const topic = this.client.topic(topicName);
      const messageId = await topic.publishMessage({
        data: GooglePubSubService.preparePublishPayload(payload),
      });

      console.log("Published message with ID:", messageId); // Log message ID
      return messageId;
    } catch (error) {
      console.error("Error publishing message:", error); // Log detailed error
      throw error;
    }
  }

  validatePayload(payload: Record<string, any>): boolean {
    return isPubSubPayload(payload);
  }
}

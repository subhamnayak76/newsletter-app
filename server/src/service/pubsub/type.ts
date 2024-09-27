export interface PubSubService {
    publish(topicId: string, payload: Record<string, unknown>): Promise<string>;
    
  }
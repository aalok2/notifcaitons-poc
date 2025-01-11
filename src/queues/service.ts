
import SlackNotification from "../notifcations/slack";
import { NotificationStage } from "./enums";
import { incomingMessage } from "./interface";
const {sendMessage} = new SlackNotification();
export class QueueService {
  private queue: incomingMessage[] = [];
 private processing = false;

  enqueue(items: incomingMessage[]): void {
    this.queue.push(...items);
     this.processQueue(); 
  }
  
  getQueue(): incomingMessage[] {
    return this.queue;
  }
   private async processQueue(): Promise<void> {
    if (this.processing) return;
    this.processing = true;

    while (this.queue.length > 0) {
      const item = this.queue.shift() as incomingMessage; // Dequeue the first item

      const { notification_stage} = item;

      const message = await this.getStatusMessage(notification_stage);

      const payload = {
        text : message
      }

        try {
          await sendMessage(payload);
        } catch (error) {
          console.error(`Error processing item:`, error);
        }
      }
        this.processing = false;
    }
    private  getStatusMessage = async (notification_stage:any) => {

    switch (notification_stage) {
    case NotificationStage.STARTED:
      return "The process has started.";
    case NotificationStage.BUILDING:
      return "The process is currently building.";
    case NotificationStage.BUILT:
      return "The process has successfully built.";
    case NotificationStage.FAILED:
      return "The process has failed.";
  }
    }
  }

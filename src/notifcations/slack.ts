import axios from 'axios';
import { incomingMessage } from '../queues/interface';

abstract class Notification {
  abstract sendMessage(message: any): Promise<void>;
}
export default class SlackNotification extends Notification {
  async sendMessage(message: any): Promise<void> {
    try {

      const url = process.env.webhookUrl ||  'https://hooks.slack.com/services/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'

      const response = await axios.post(url, message, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(`Message sent to Slack: ${response.status} - ${response.statusText}`);
    } catch (error) {
      console.error('Error sending message to Slack:', error);
    }
  }
}

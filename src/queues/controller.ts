import { Response, Request } from "express";
import { incomingMessage } from "./interface";
import {QueueService} from "./service";
export default class QueuesController
  extends QueueService
{
  public recieveMessage = async (req: Request, res: Response): Promise<void> => {
    /*
     *
     * @param req
     * @param res
     */
    try {
      const response = await this.enqueue(req.body);
      res.status(200).send({ contact: response, success: true });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({ success: false, message: "Internal ServerError.", err });
    }
  };
}

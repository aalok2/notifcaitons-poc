import { Router } from "express";
import QueueController from "./controller";

const { recieveMessage } = new QueueController();

const contactsRouter = Router();

contactsRouter.post("/ping",recieveMessage );

export default contactsRouter;

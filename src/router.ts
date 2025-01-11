import { Router } from "express";
import queue from "./queues/router";

const router = Router();

router.use("/queue", queue);

export default router;

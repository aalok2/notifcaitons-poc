import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import router from "./router";
export const app: express.Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


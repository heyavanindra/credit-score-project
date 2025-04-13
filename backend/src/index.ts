import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors"
import creditScoreRoute from "./creditScoreRoute/creditScore.route";
const PORT = 3000;
const app = express();
dotenv.config();
app.use(cors())

app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  res.send("hello world");
});

app.use("/creditscore", creditScoreRoute);

app.listen(PORT, () => {
  console.log(`This app is running on Port ${PORT}`);
});

import express, { Request, Response } from "express";
import { inputValidationSchema } from "../validatonSchema/schema";
import { calculateCreditScore, CreditData } from "../services/services";
const creditScoreRoute = express.Router();

creditScoreRoute.post("/", async (req: Request, res: Response) => {
  const parsedData = inputValidationSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      error: parsedData.error.format(),
    });
  }
  const creditCardData = parsedData.data;
  const creditScore = calculateCreditScore(creditCardData as CreditData);

  res.json(creditScore).status(200);
});

export default creditScoreRoute;

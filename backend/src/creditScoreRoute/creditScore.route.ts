import express, { Request, Response } from "express";
import { inputValidationSchema } from "../validatonSchema/schema";
import { calculateCreditScore, CreditData } from "../services/services";
import { usermodel } from "../models/models";
const creditScoreRoute = express.Router();

creditScoreRoute.post("/", async (req: Request, res: Response) => {
  const parsedData = inputValidationSchema.safeParse(req.body);
  console.log(parsedData);
  if (!parsedData.success) {
    res.status(400).json({
      error: parsedData.error.format(),
    });
    return;
  }
  const creditCardData = parsedData.data.data;
  console.log(creditCardData);
  try {
    const userFound = await usermodel.findOne({
      userId: parsedData.data.userId,
    });

    if (!userFound) {
      const creditScore = calculateCreditScore(creditCardData);
      const updatedData = { ...creditCardData, creditScore: creditScore };
      const userCreated = await usermodel.create({
        userId: parsedData.data.userId,
        data: updatedData,
      });
      await userCreated.save();
      res.json(creditScore);
      return;
    }
    const creditScore = calculateCreditScore(creditCardData);
    const updatedCreditScore = { ...creditCardData, creditScore: creditScore };

    userFound.data.push(updatedCreditScore);
    await userFound.save();

    res.json(creditScore).status(200);
  } catch (error) {
    console.log(error);
    res.json({
      error: error,
    });
  }
});

creditScoreRoute.get(
  "/",
  async (req: Request, res: Response) => {
    const {userId} = req.body

    try {
      const userFound = await usermodel.findOne({
        userId:userId
      })
  
      if (!userFound) {
        res.json({
          message:'user does not exist'
        }).json(404)
        return
      }
  
      const creditScore = userFound.data
  
      res.json({
        creditScore:creditScore
      }).status(201)
      
    } catch (error) {

      res.json({
        message:"something went wrong in db"
      }).status(400)
    }

  }
);

export default creditScoreRoute;

import { z } from "zod";
import { inputValidationSchema } from "../validatonSchema/schema";

export type CreditData = z.infer<typeof inputValidationSchema>;

export function calculateCreditScore(data: CreditData): number {
    const MAX_SCORE = 850;
    let score = 0;
  
    // 1. Payment History (35%)
    const payments = data.creditCardUsageSchema.paymentHistory;
    const onTime = payments.filter(p => p.ontime).length;
    const paymentHistoryScore = (onTime / payments.length) * 100;
    const weightedPaymentScore = (paymentHistoryScore / 100) * 35;
  
    // 2. Amount Owed / Credit Utilization (30%)
    const usageRatio = data.creditCardUsageSchema.currentUsage / data.creditCardUsageSchema.totalLimit;
    let utilizationScore = 0;
    if (usageRatio < 0.1) utilizationScore = 100;
    else if (usageRatio < 0.3) utilizationScore = 90;
    else if (usageRatio < 0.5) utilizationScore = 70;
    else if (usageRatio < 0.7) utilizationScore = 50;
    else utilizationScore = 30;
    const weightedUtilizationScore = (utilizationScore / 100) * 30;
  
    // 3. Length of Credit History (15%) — use UPI history months
    const months = data.upiHistory.lastSixMonthsTransactions.length;
    const lengthScore = Math.min(months / 6, 1) * 100; // full 6 months = full score
    const weightedLengthScore = (lengthScore / 100) * 15;
  
    // 4. New Credit (10%) — more UPI volume = better engagement
    const volume = data.upiHistory.monthlyTransactions;
    const newCreditScore = Math.min(volume * 2, 100); // scale to 100 max
    const weightedNewCredit = (newCreditScore / 100) * 10;
  
    // 5. Credit Mix (10%) — use sector + location
    let mixScore = 0;
    if (data.employment.sector === "government") mixScore += 50;
    else if (data.employment.sector === "public") mixScore += 35;
    else mixScore += 20;
  
    if (data.location.tier === "tier1") mixScore += 50;
    else if (data.location.tier === "tier2") mixScore += 30;
    else mixScore += 10;
  
    const weightedMixScore = (mixScore / 100) * 10;
  
    // Total weighted score
    const totalWeightedScore = weightedPaymentScore + weightedUtilizationScore + weightedLengthScore + weightedNewCredit + weightedMixScore;
  
    const finalScore = Math.round((totalWeightedScore / 100) * MAX_SCORE);
    return finalScore;
  }
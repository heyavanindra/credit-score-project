import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGO_URI!);

const userInfoSchema = new mongoose.Schema({
  userId: { type: String, require: true },
  creditCardUsage: {
    totalLimit: Number,
    currentUsage: Number,
    paymentHistory: [
      {
        month: String,
        onTime: Boolean,
      },
    ],
  },
  upiHistory: {
    monthlyTransaction: Number,
    averageTransactionValue: Number,
    lastSixMonthsTransactions: [
      { month: String, volume: String, value: Number },
    ],
  },
  utilityBills: {
    type: Map,
    of: new mongoose.Schema({
      onTimePayment: Number,
      latePayment: Number,
    }),
  },
  employment: {
    employmentStatus: {
      type: String,
      enum: ["employed", "unemployed"],
      require: true,
    },
    sector: {
      type: String,
      enum: ["private", "public", "self-employed"],
    },
    monthlyIncome: Number,
    employerReputationScore: Number,
  },
  location: {
    city: String,
    tier: { type: String, enum: ["tier1", "tier2", "tier3"] },
    urbanizationScore: Number,
  },
});

const userInfoModal = mongoose.model("UserInfo", userInfoSchema);

export default userInfoModal;

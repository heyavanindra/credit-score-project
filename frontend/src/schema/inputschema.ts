import { z } from "zod";

// zod schema for validating input data
// if inputs are incorrect it will throw an error

export const creditCardUsageSchema = z.object({
  totalLimit: z
    .number({
      required_error: "Total credit limit is required",
      invalid_type_error: "Total credit limit is invalid",
    })
    .nonnegative("Total credit limit must be a non-negative number"),
  currentUsage: z
    .number({
      required_error: "Current usage is required",
      invalid_type_error: "Current usage is invalid",
    })
    .nonnegative("Current usage must be a non-negative number"),
  paymentHistory: z.array(
    z.object({
      month: z.enum(
        [
          "jan",
          "feb",
          "march",
          "april",
          "may",
          "june",
          "july",
          "aug",
          "sept",
          "oct",
          "nav",
          "dec",
        ],
        {
          required_error: "month is requied",
          invalid_type_error: "month is incorrect",
        }
      ),
      ontime: z.boolean({
        required_error: "On time is required",
        invalid_type_error: "On time is invalid",
      }),
    }),
    {
      required_error: "Payment history is required",
      invalid_type_error: "Payment history is invalid",
    }
  ),
});

export const upiHistorySchema = z.object({
  monthlyTransactions: z.number({
    required_error: "Monthly transactions is required",
    invalid_type_error: "Monthly transactions is invalid",
  }),
  averageTransactionValue: z.number({
    required_error: "Average transaction value is required",
    invalid_type_error: "Average transaction value is invalid",
  }),
  lastSixMonthsTransactions: z.array(
    z.object({
      month: z.enum(
        [
          "jan",
          "feb",
          "march",
          "april",
          "may",
          "june",
          "july",
          "aug",
          "sept",
          "oct",
          "nav",
          "dec",
        ],
        {
          required_error: "month is required",
          invalid_type_error: "month is incorrect",
        }
      ),
      volume: z.number({
        required_error: "Volume is required",
        invalid_type_error: "Volume is invalid",
      }),
      value: z.number({
        required_error: "Value is required",
        invalid_type_error: "Value is invalid",
      }),
    })
  ),
});

export const employmentSchema = z.object({
  employmentStatus: z.enum(["employed", "unemployed", "self-employed"], {
    required_error: "Employment status is required",
    invalid_type_error: "Employment status is invalid",
  }),
  monthlyIncome: z
    .number({
      required_error: "Monthly income is required",
      invalid_type_error: "Monthly income is invalid",
    })
    .nonnegative("Monthly income must be a non-negative number"),
  employerReputation: z
    .number({
      required_error: "Employer reputation is required",
      invalid_type_error: " Employer reputation is invalid",
    })
    .min(0, "Employer reputation must be at least 0")
    .max(10, "Employer reputation must be at most 10"),
  sector: z.enum(["private", "public", "self-employed"], {
    required_error: "Sector is required",
    invalid_type_error: "Sector is invalid",
  }),
});

export const locationSchema = z.object({
  city: z.string({
    required_error: "City is required",
    invalid_type_error: "City is invalid",
  }),
  tier: z.enum(["tier1", "tier2", "tier3"], {
    required_error: "Tier is required",
    invalid_type_error: "Tier is invalid",
  }),
  urbalizationScore: z
    .number({
      required_error: "Urbanization score is required",
      invalid_type_error: "Urbanization score is invalid",
    })
    .min(0, "Urbanization score must be at least 0")
    .max(10, "Urbanization score must be at most 10"),
});

export const inputValidationSchema = z.object({
  userId: z
    .string({
      required_error: "UserId Is Required",
      invalid_type_error: "User Id Is invalid",
    })
    .min(4, "UserId must be at least 4 character long"),
  creditCardUsage: creditCardUsageSchema,
  upiHistory: upiHistorySchema,
  employment: employmentSchema,
  location: locationSchema,
});

export type inputType = z.infer<typeof inputValidationSchema>;

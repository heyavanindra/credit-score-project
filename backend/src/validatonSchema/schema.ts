import { z } from "zod";

// zod schema for validating input data
// if inputs are incorrect it will throw an error

const creditCardUsageSchema = z.object({
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
      month: z.string({
        required_error: "Month is required",
        invalid_type_error: "Month is invalid",
      }),
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

const upiHistorySchema = z.object({
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
      month: z.string({
        required_error: "Month is required",
        invalid_type_error: "Month is invalid",
      }),
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

const employment = z.object({
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

const location = z.object({
  city: z.string({
    required_error: "City is required",
    invalid_type_error: "City is invalid",
  }),
  tier: z.enum(["tier1", "tier2", "tier3"], {
    required_error: "Tier is required",
    invalid_type_error: "Tier is invalid",
  }),
  urbanizationScore: z
    .number({
      required_error: "Urbanization score is required",
      invalid_type_error: "Urbanization score is invalid",
    })
    .min(0, "Urbanization score must be at least 0")
    .max(10, "Urbanization score must be at most 10"),
});

export const inputFieldSchema = z.object({
  creditCardUsage: creditCardUsageSchema,
  upiHistory: upiHistorySchema,
  employment: employment,
  location: location,
});

export const inputValidationSchema = z.object({
  userId: z.string({
    required_error: "UserId Is Required",
    invalid_type_error: "User Id Is invalid",
  }),
  data:inputFieldSchema
});

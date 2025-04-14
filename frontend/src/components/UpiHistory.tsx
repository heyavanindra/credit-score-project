import { Control, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const UpiHistory = ({
  register,
  errors,
  control
}: {
  register: UseFormRegister<inputType>,
  errors: FieldErrors<inputType>,
  control: Control<inputType>
}) => {
  const { fields, remove, append } = useFieldArray({
    name: "upiHistory.lastSixMonthsTransactions",
    control
  })

  return (
    <div className="space-y-6">
      {/* Monthly Transactions & Average Income */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Monthly Transactions</label>
          <input
            type="number"
            {...register("upiHistory.monthlyTransactions",{
              valueAsNumber:true
            })}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.upiHistory?.monthlyTransactions ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter monthly transaction count"
          />
          {errors.upiHistory?.monthlyTransactions && (
            <p className="text-sm text-red-600">{errors.upiHistory.monthlyTransactions.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Average Transaction Value</label>
          <input
            type="number"
            {...register("upiHistory.averageTransactionValue",{valueAsNumber:true})}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.upiHistory?.averageTransactionValue ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter average transaction value"
          />
          {errors.upiHistory?.averageTransactionValue && (
            <p className="text-sm text-red-600">{errors.upiHistory.averageTransactionValue.message}</p>
          )}
        </div>
      </div>

      {/* Last Six Month Transactions */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Last 6 Months Transactions</label>

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg border items-end">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Month</label>
              <input
                type="text"
                {...register(`upiHistory.lastSixMonthsTransactions.${index}.month`)}
                placeholder="e.g. Jan"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Volume</label>
              <input
                type="text"
                {...register(`upiHistory.lastSixMonthsTransactions.${index}.volume`,{valueAsNumber:true})}
                placeholder="Number of transactions"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-600">Value</label>
              <input
                type="number"
                {...register(`upiHistory.lastSixMonthsTransactions.${index}.value`,{valueAsNumber:true})}
                placeholder="Total value"
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ month: "jan", value: 0, volume: 0 })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Add Transaction
        </button>
      </div>
    </div>
  )
}

export default UpiHistory

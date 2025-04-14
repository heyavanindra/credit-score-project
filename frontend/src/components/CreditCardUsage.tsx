import { Control, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const CreditCardUsage = ({
  register,
  errors,
  control
}: {
  register: UseFormRegister<inputType>,
  errors: FieldErrors<inputType>,
  control: Control<inputType>
}) => {
  const { fields, remove, append } = useFieldArray<inputType>({
    name: "creditCardUsage.paymentHistory",
    control
  })

  return (
    <div className="space-y-6">
      {/* Total & Current Limit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Total Limit</label>
          <input
            type="number"
            {...register("creditCardUsage.totalLimit")}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.creditCardUsage?.totalLimit ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter total credit limit"
          />
          {errors.creditCardUsage?.totalLimit && (
            <p className="text-sm text-red-600">{errors.creditCardUsage.totalLimit.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Current Usage</label>
          <input
            type="number"
            {...register("creditCardUsage.currentUsage")}
            className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.creditCardUsage?.currentUsage ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter current usage"
          />
          {errors.creditCardUsage?.currentUsage && (
            <p className="text-sm text-red-600">{errors.creditCardUsage.currentUsage.message}</p>
          )}
        </div>
      </div>

      {/* Payment History */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Payment History</label>

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-3 bg-gray-50 p-4 rounded-lg border">
            <input
              type="text"
              {...register(`creditCardUsage.paymentHistory.${index}.month`)}
              placeholder="Month (e.g. Jan)"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(`creditCardUsage.paymentHistory.${index}.ontime`)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">On Time</span>
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:underline text-sm self-start md:self-center"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => append({ month: "jan", ontime: false })}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          Add Payment
        </button>
      </div>
    </div>
  )
}

export default CreditCardUsage

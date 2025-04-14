import { FieldErrors, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const UserId = ({
  register,
  errors
}: {
  register: UseFormRegister<inputType>,
  errors: FieldErrors<inputType>
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="userId" className="text-sm font-medium text-gray-700">
        User ID
      </label>
      <input
        type="text"
        id="userId"
        {...register("userId")}
        className={`border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 ${
          errors.userId ? "border-red-500" : "border-gray-300"
        }`}
        placeholder="Enter your User ID"
      />
      {errors.userId && (
        <p className="text-sm text-red-600">{errors.userId.message}</p>
      )}
    </div>
  )
}

export default UserId

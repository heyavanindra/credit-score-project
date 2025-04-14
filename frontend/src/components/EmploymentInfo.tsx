import { FieldErrors, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const EmploymentInfo = ({
  register,
  errors,
}: {
  register: UseFormRegister<inputType>
  errors: FieldErrors<inputType>
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6 space-y-4">
      <div>
        <label htmlFor="employmentStatus" className="block text-sm font-medium text-gray-700 mb-1">
          Employment Status
        </label>
        <select
          id="employmentStatus"
          {...register("employment.employmentStatus")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="employed">Employed</option>
          <option value="unemployed">Un-Employed</option>
          <option value="self-employed">Self Employed</option>
        </select>
        {errors.employment?.employmentStatus && (
          <p className="text-red-500 text-sm mt-1">{errors.employment?.employmentStatus.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-1">
          Monthly Income
        </label>
        <input
          id="monthlyIncome"
          type="text"
          {...register("employment.monthlyIncome")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.employment?.monthlyIncome && (
          <p className="text-red-500 text-sm mt-1">{errors.employment?.monthlyIncome.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="employerReputation" className="block text-sm font-medium text-gray-700 mb-1">
          Employer Reputation
        </label>
        <input
          id="employerReputation"
          type="number"
          {...register("employment.employerReputation")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.employment?.employerReputation && (
          <p className="text-red-500 text-sm mt-1">{errors.employment?.employerReputation.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="sector" className="block text-sm font-medium text-gray-700 mb-1">
          Sector
        </label>
        <select
          id="sector"
          {...register("employment.sector")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
          <option value="self-employed">Self-employed</option>
        </select>
        {errors.employment?.sector && (
          <p className="text-red-500 text-sm mt-1">{errors.employment?.sector.message}</p>
        )}
      </div>
    </div>
  )
}

export default EmploymentInfo

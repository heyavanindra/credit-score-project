import { FieldErrors, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const LocationInfo = ({ register, errors }: { register: UseFormRegister<inputType>, errors: FieldErrors<inputType> }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6 space-y-4">
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <input
          id="city"
          type="text"
          {...register("location.city")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.location?.city && <p className="text-red-500 text-sm mt-1">{errors.location.city.message}</p>}
      </div>

      <div>
        <label htmlFor="tier" className="block text-sm font-medium text-gray-700 mb-1">Tier</label>
        <select
          id="tier"
          {...register("location.tier")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
        >
          <option value="tier1">Tier 1</option>
          <option value="tier2">Tier 2</option>
          <option value="tier3">Tier 3</option>
        </select>
        {errors.location?.tier && <p className="text-red-500 text-sm mt-1">{errors.location.tier.message}</p>}
      </div>

      <div>
        <label htmlFor="urbalizationScore" className="block text-sm font-medium text-gray-700 mb-1">Urbanization Score</label>
        <input
          id="urbalizationScore"
          type="number"
          {...register("location.urbalizationScore",{
            valueAsNumber:true
          })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {errors.location?.urbalizationScore && (
          <p className="text-red-500 text-sm mt-1">{errors.location.urbalizationScore.message}</p>
        )}
      </div>
    </div>
  )
}

export default LocationInfo

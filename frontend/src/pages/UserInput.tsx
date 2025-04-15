import { inputType, inputValidationSchema } from "../schema/inputschema"
import { SubmitHandler, useForm } from 'react-hook-form'
import UserId from "../components/UserId"
import CreditCardUsage from "../components/CreditCardUsage"
import UpiHistory from "../components/UpiHistory"
import { zodResolver } from "@hookform/resolvers/zod"
import EmploymentInfo from "../components/EmploymentInfo"
import LocationInfo from "../components/LocationInfo"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useState } from "react"
const api = import.meta.env.VITE_API_BASE_URL

const UserInput = () => {
  const [error, setError] = useState<AxiosError>()
  const [response, setResponse] = useState<AxiosResponse>()
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<inputType>({
    resolver: zodResolver(inputValidationSchema)
  })

  const onSubmit: SubmitHandler<inputType> = async (data) => {
    try {
      console.log("API URL:", import.meta.env.VITE_API_BASE_URL + '/creditscore');
      const response = await axios.post(`${api}/creditscore`, data)
      const responseData = response
      setResponse(responseData)
      console.log(responseData)

    } catch (error) {
      const axiosError = error as AxiosError
      setError(axiosError)
    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 space-y-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">User Input Form</h2>

        <UserId register={register} errors={errors} />
        <CreditCardUsage register={register} errors={errors} control={control} />
        <UpiHistory register={register} errors={errors} control={control} />
        <LocationInfo register={register} errors={errors} />
        <EmploymentInfo register={register} errors={errors} />

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium px-6 py-2 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>

      {/* Error message */}
      {error && (
        <div className="text-red-600 font-medium text-center">
          {error.message}
        </div>
      )}

      {/* Credit Score Response - Positioned at bottom */}
      {response?.data && (
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Your Credit Score</h3>
          <div
            className={`
              text-5xl font-bold py-4 rounded-xl 
              ${response.data < 500 ? 'text-red-500' :
                response.data < 650 ? 'text-yellow-500' :
                  response.data < 750 ? 'text-green-500' :
                    'text-emerald-600'}
            `}
          >
            {response.data}
          </div>
          <p className="text-lg font-medium mt-2 text-gray-600">
            {
              response.data < 500 ? "Poor - Needs serious improvement" :
                response.data < 650 ? "Fair - Can be improved" :
                  response.data < 750 ? "Good - Keep it up!" :
                    "Excellent - You're doing great!"
            }
          </p>
        </div>
      )}
    </div>
  );


}

export default UserInput

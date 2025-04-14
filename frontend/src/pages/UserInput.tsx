import { inputType, inputValidationSchema } from "../schema/inputschema"
import { SubmitHandler, useForm } from 'react-hook-form'
import UserId from "../components/UserId"
import CreditCardUsage from "../components/CreditCardUsage"
import UpiHistory from "../components/UpiHistory"
import { zodResolver } from "@hookform/resolvers/zod"
import EmploymentInfo from "../components/EmploymentInfo"
import LocationInfo from "../components/LocationInfo"

const UserInput = () => {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<inputType>({
    resolver: zodResolver(inputValidationSchema)
  })

  const onSubmit: SubmitHandler<inputType> = (data) => {
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">User Input Form</h2>
        
        <UserId register={register} errors={errors} />
        <CreditCardUsage register={register} errors={errors} control={control} />
        <UpiHistory register={register} errors={errors} control={control} />
        <LocationInfo register={register} errors={errors}></LocationInfo>
        <EmploymentInfo register={register} errors={errors}></EmploymentInfo>

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
    </div>
  )
}

export default UserInput

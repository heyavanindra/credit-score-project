import { inputType } from "../schema/inputschema"
import { SubmitHandler, useForm } from 'react-hook-form'
import UserId from "../components/UserId"
import CreditCardUsage from "../components/CreditCardUsage"
import UpiHistory from "../components/UpiHistory"

const UserInput = () => {

  const { register, handleSubmit, control, formState: {
    errors, isSubmitting
  } } = useForm<inputType>()

  const onSubmit: SubmitHandler<inputType> = (data) => {
    console.log(data)
  }


  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <UserId register={register} errors={errors} ></UserId>
        <CreditCardUsage register={register} errors={errors} control={control}></CreditCardUsage>
        <UpiHistory register={register} errors={errors} control={control}></UpiHistory>
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
    </div>
  )
}

export default UserInput
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const UserId = ({ register, errors }: { register: UseFormRegister<inputType>, errors: FieldErrors<inputType> }) => {
    return (
        <div>
            <label htmlFor="">User Id</label>
            <input type="text" {...register("userId")} />
            {errors.userId && <p>{errors.userId?.message}</p>}
        </div>
    )
}

export default UserId
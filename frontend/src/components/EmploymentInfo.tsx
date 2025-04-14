import { FieldErrors, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const EmploymentInfo = ({ register, errors }: { register: UseFormRegister<inputType>, errors: FieldErrors<inputType> }) => {

    return (
        <div>
            <label htmlFor="">Employment Status</label>
            <select {...register("employment.employmentStatus")}>
                <option value="employed">Employed</option>
                <option value="unemployed">Un-Employed</option>
                <option value="self-employed">Self Employed</option>
            </select>
            <label htmlFor="">Monthly Income</label>
            <input type="text" {...register("employment.monthlyIncome")} />
            <label htmlFor="" >Employer Reputation</label>
            <input type="number" />
            <label htmlFor="">Sector</label>
            <select name="" id="">
                <option value="private">
                    Private
                </option>
                <option value="public">Public</option>
                <option value="self-employed">Self-employed</option>
            </select>
        </div>
    )
}

export default EmploymentInfo
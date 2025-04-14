import { Control, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const CreditCardUsage = ({ register, errors, control } : { register: UseFormRegister<inputType>, errors: FieldErrors<inputType>, control: Control<inputType> }) => {
    const { fields, remove, append } = useFieldArray<inputType>({
        name: "creditCardUsage.paymentHistory",
        control
    })
    return (
        <div>

            <label htmlFor="">Total Limit</label>
            <input type="number" {...register("creditCardUsage.totalLimit")} />
            {errors.creditCardUsage?.totalLimit && <p>{errors.creditCardUsage?.totalLimit?.message}</p>}
            <label htmlFor="" >Current Limit</label>
            <input type="number" {...register("creditCardUsage.currentUsage")} />
            {errors.creditCardUsage?.currentUsage && <p>{errors.creditCardUsage?.currentUsage.message}</p>}
            <div>
                <label htmlFor="">Payment</label>
                {fields.map((field, index) => {
                    return <div key={field.id}>
                        <input type="text" {...register(`creditCardUsage.paymentHistory.${index}.month`)} />
                        <input type="checkbox" {...register(`creditCardUsage.paymentHistory.${index}.ontime`)} />
                        {
                            index >= 0 && <button type="button" onClick={() => {
                                remove(index)
                            }}>Remove</button>
                        }
                    </div>
                })}
            </div>
            <button type="button" onClick={() => {
                append({
                    month: "jan",
                    ontime: false
                })
            }}>Add</button>

        </div>
    )
}

export default CreditCardUsage
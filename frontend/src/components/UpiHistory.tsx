import { Control, FieldErrors, useFieldArray, UseFormRegister } from "react-hook-form"
import { inputType } from "../schema/inputschema"

const UpiHistory = ({ register, errors, control }: { register: UseFormRegister<inputType>, errors: FieldErrors<inputType>, control: Control<inputType> }) => {
    const { fields, remove, append } = useFieldArray({
        name: "upiHistory.lastSixMonthsTransactions",
        control
    })
    return (
        <div>
            <label htmlFor="">Monthly Transaction</label>
            <input type="number" {...register("upiHistory.averageTransactionValue")} />
            {errors.upiHistory?.monthlyTransactions && <p>{errors.upiHistory.monthlyTransactions.message}</p>}

            <label htmlFor="">Average Income</label>
            <input type="number" {...register('upiHistory.averageTransactionValue')} />
            {errors.upiHistory?.averageTransactionValue && <p>{errors.upiHistory.averageTransactionValue.message}</p>}
            <label htmlFor="">Last Six Month Transaction</label>
            {fields.map((field, index) => {
                return <div key={field.id}>
                    <label htmlFor="month">month</label>

                    <input type="text" {...register(`upiHistory.lastSixMonthsTransactions.${index}.month`)} />
                    <label htmlFor="">volume</label>
                    <input type="text" {...register(`upiHistory.lastSixMonthsTransactions.${index}.volume`)} />

                    <label htmlFor="">Value</label>
                    <input type="number" {...register(`upiHistory.lastSixMonthsTransactions.${index}.value`)} />

                    <button type="button" onClick={() => {
                        remove(index)
                    }}>Remove</button>

                </div>
            })}
            

            <button onClick={() => {
                append({
                    month: "jan",
                    value: 0,
                    volume: 0
                })
            }}>Add</button>
        </div>
    )
}

export default UpiHistory
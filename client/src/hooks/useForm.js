import { useState } from "react"

export default function useForm(callBack, initialValues) {

    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    const formAction = async () => {
        await callBack(values);

        setValues(initialValues);
    }

    const register = (fieldName) => {
        return {
            name: fieldName,
            onChange: changeHandler,
            value: values[fieldName],
        }
    }

    return { formAction, changeHandler, values, register }

}
import { useState } from "react";


export const useForm = (initialState ={}) => {
const [values, setValues] = useState(initialState);

const clearFormFields = () => {
        console.log(initialState);
    setValues(initialState);
}

const handleInputChange = ({target}) => {
    setValues({
        ...values,
        [target.name]:target.value
    });
}

const handleSetInput = (inputvalues) => {
    setValues(
        inputvalues
    );
}

return [values, handleInputChange, clearFormFields,handleSetInput]
}

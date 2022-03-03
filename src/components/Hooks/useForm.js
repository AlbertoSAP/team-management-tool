import { useState } from "react";


export const useForm = (initialState ={}) => {
const [values, setValues] = useState(initialState);

const clearFormFields = () => {
    setValues({
        ...values, ...initialState
    })
}

const handleInputChange = ({target}) => {
    setValues({
        ...values,
        [target.name]:target.value
    });
}

const handleSetInput = (inputvalues) => {
    setValues({
      ...values, ...inputvalues
    }
        
    );
}

return [values, handleInputChange, clearFormFields,handleSetInput]
}

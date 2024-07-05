import React, {forwardRef, useRef} from 'react';
import InputMask from 'react-input-mask';
import {useField} from 'formik';

const MaskedInput = (props) => {
    const [field, meta] = useField(props);
    const inputRef = useRef(null);

    return <>
        <InputMask ref={inputRef} {...field} {...props} mask="(999) 999-9999" maskChar=" "/>
        {meta.touched && meta.error ? (
            <div className="invalid-feedback">{meta.error}</div>
        ) : null}
    </>
};

export default MaskedInput;
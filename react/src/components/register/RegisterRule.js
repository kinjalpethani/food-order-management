import * as Yup from "yup";
import Config from "../../helpers/config";
import {redirect} from "react-router-dom";

export const RegisterRule = Yup.object({
    user_first_name: Yup.string().required('First name is required'),
    user_last_name: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required').email('Invalid Email'),
    user_password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    user_password_confirmation: Yup.string().oneOf([Yup.ref('user_password'), null], 'Passwords must match')
        .required('Confirm password is required')
});

export const initialValues = {
    user_first_name: '',
    user_last_name: '',
    email: '',
    user_password: '',
    user_password_confirmation: '',
    user_address: '',
    user_contact_number: ''
}

export const handleSubmit = async (values, { setSubmitting, setFieldError }, navigate) => {
    try {
        const postValues = {
            ...values,
            user_contact_number: values.user_contact_number ? values.user_contact_number.replace(/\D/g, '') : '',
        };

        const { http } = Config();
        const response = await http.post('register', postValues);
        navigate('/login');
    } catch (error) {
        if (error.response) {
            const serverErrors = error.response.data.errors;
            Object.keys(serverErrors).forEach(fieldName => {
                setFieldError(fieldName, serverErrors[fieldName]);
            });
        }
    }
    setSubmitting(false);
};
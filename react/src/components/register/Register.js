import {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {Logo} from "../layouts/Logo";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Label} from "../inputs/Label";
import MaskedInput from "../inputs/MaskedInput";
import {RegisterRule, initialValues, handleSubmit} from './RegisterRule';

export const Register = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    const navigate = useNavigate();

    const handlePasswordToggle = (type = '') => {
        if (type === 'confirm') setConfirmPasswordType(preType => preType === 'text' ? 'password' : 'text');
        else setPasswordType(preType => preType === 'text' ? 'password' : 'text');
    }

    return <>
        <Formik
            initialValues={initialValues}
            validationSchema={RegisterRule}
            onSubmit={(values, props) => handleSubmit(values, props, navigate)}
            // onSubmit={handleSubmit}
        >
            {({touched, errors, isSubmitting}) => (
                <Form className="flex-fill" method="POST">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="text-center mb-3">
                                        <Logo/>
                                        <br/><br/>
                                        <h5 className="mb-0">Create your account</h5>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <Label required>First Name</Label>
                                                <Field
                                                    className={`form-control ${touched.user_first_name && errors.user_first_name && 'is-invalid'}`}
                                                    type="text" name="user_first_name"
                                                    placeholder="First Name"/>
                                                <ErrorMessage name="user_first_name" component="span"
                                                              className="invalid-feedback"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <Label required>Last Name</Label>
                                                <Field
                                                    className={`form-control ${touched.user_last_name && errors.user_last_name && 'is-invalid'}`}
                                                    type="text" name="user_last_name"
                                                    placeholder="Last Name"/>
                                                <ErrorMessage name="user_last_name" component="span"
                                                              className="invalid-feedback"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <Label required>Email</Label>
                                                <Field
                                                    className={`form-control ${touched.email && errors.email && 'is-invalid'}`}
                                                    type="email" name="email"
                                                    placeholder="Email"/>
                                                <ErrorMessage name="email" component="span"
                                                              className="invalid-feedback"/>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <Label>Mobile Number</Label>
                                                <MaskedInput className="form-control" type="text"
                                                             name="user_contact_number"
                                                             placeholder="Mobile Number"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <Label required>Password</Label>
                                                <div className="input-group">
                                                    <Field
                                                        className={`form-control ${touched.user_password && errors.user_password && 'is-invalid'}`}
                                                        type={passwordType}
                                                        name="user_password"
                                                        placeholder="Password" autoComplete="off"/>
                                                    <span className="input-group-append">
                                                        <span className="input-group-text"
                                                              onClick={() => handlePasswordToggle('password')}><i
                                                            className={passwordType === 'password' ? 'icon-eye' : 'icon-eye-blocked'}></i>
                                                        </span>
                                                    </span>
                                                    <ErrorMessage name="user_password" component="span"
                                                                  className="invalid-feedback"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <Label required>Confirm Password</Label>
                                                <div className="input-group">
                                                    <Field
                                                        className={`form-control ${touched.user_password_confirmation && errors.user_password_confirmation && 'is-invalid'}`}
                                                        type={confirmPasswordType}
                                                        name="user_password_confirmation"
                                                        placeholder="Confirm Password" autoComplete="off"/>
                                                    <span className="input-group-append">
                                                        <span className="input-group-text"
                                                              onClick={() => handlePasswordToggle('confirm')}><i
                                                            className={confirmPasswordType === 'password' ? 'icon-eye' : 'icon-eye-blocked'}></i>
                                                        </span>
                                                    </span>
                                                    <ErrorMessage name="user_password_confirmation" component="span"
                                                                  className="invalid-feedback"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-sm-6">
                                            <div className="form-group">
                                                <Label>Address</Label>
                                                <Field as="textarea" className="form-control " placeholder="Address"
                                                       rows="3"
                                                       name="user_address"
                                                       cols="50"></Field>
                                            </div>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary"
                                                disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Register'}</button>
                                        <NavLink to="/login" className="btn ml-2 btn-light">Cancel</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </>
}
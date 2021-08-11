import { useState } from 'react';
import { Formik, Form } from 'formik';
import { defaultValues, validationSchema } from './';
import { FormField } from 'components';
import { useHistory } from 'react-router';

export const Signup = () => {
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    console.log('Signing Up:', email, userName, password);
  };

  return (
    <div className="auth-form">
      <h1>Signup</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField label="Username" type="text" name="userName" />
            <FormField label="Email" type="email" name="email" />
            <FormField label="Password" type="password" name="password" />
            <FormField
              label="Confirm Password"
              type="password"
              name="verifyPassword"
            />
            <div className="auth-link-container">
              Already have an account?{' '}
              <span className="auth-link" onClick={() => history.push('login')}>
                Log In!
              </span>
            </div>
            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

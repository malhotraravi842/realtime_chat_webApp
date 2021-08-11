import { useState } from 'react';
import { useHistory } from 'react-router';
import { Formik, Form } from 'formik';
import { FormField } from 'components';
import { defaultValues, validationSchema } from './';

export const Login = () => {
  const [serverError, setServerError] = useState('');
  const history = useHistory();
  const login = ({ email, password }, { setSubmitting }) => {
    console.log('Logging In: ', email, password);
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField type="email" label="Email Address" name="email" />
            <FormField type="password" label="Password" name="password" />
            <div className="auth-link-container">
              Don't have an account?{' '}
              <span
                className="auth-link"
                onClick={() => history.push('signup')}
              >
                Sign Up!
              </span>
            </div>
            <button disabled={isSubmitting || !isValid} type="submit">
              LogIn
            </button>
          </Form>
        )}
      </Formik>
      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};

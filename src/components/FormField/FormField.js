import { ErrorMessage, Field } from 'formik';

export const FormField = props => {
  return (
    <label>
      {props.label}
      <Field type={props.type} name={props.name} />
      <ErrorMessage className="error" component="div" name={props.name} />
    </label>
  );
};

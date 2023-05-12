import s from './login-form.module.scss';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormTitle } from '../../../../components/form/components/form-title';
import { FormSubmitBtn } from '../../../../components/form/components/form-submit-btn';

export const LoginForm = () => {
  const intl = useIntl();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(intl.formatMessage({ id: 'form.errors.email.incorrect' }))
      .required(intl.formatMessage({ id: 'form.errors.input.required' })),
    password: Yup.string().required(intl.formatMessage({ id: 'form.errors.input.required' })),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ errors, isValid, touched, dirty }) => (
        <Form className='form'>
          <FormTitle>{intl.formatMessage({ id: 'login.form.title' })}</FormTitle>
          <Field
            name={'email'}
            type={'email'}
            as={EmailInput}
            placeholder={intl.formatMessage({ id: 'form.placeholder.email' })}
            error={touched.email && !!errors.email}
            errorText={touched.email && errors.email}
          />
          <Field
            name={'password'}
            type={'password'}
            icon={'ShowIcon'}
            as={Input}
            placeholder={intl.formatMessage({ id: 'form.placeholder.password' })}
            error={touched.password && !!errors.password}
            errorText={touched.password && errors.password}
          />
          <FormSubmitBtn disabled={!dirty || !isValid}>
            {intl.formatMessage({ id: 'login.form.submit' })}
          </FormSubmitBtn>
        </Form>
      )}
    </Formik>
  );
};

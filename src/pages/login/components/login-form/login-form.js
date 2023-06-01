import s from './login-form.module.scss';
import { useIntl } from 'react-intl';
import clsx from 'clsx';
import * as Yup from 'yup';
import Cookies from 'universal-cookie';
import { Formik, Form, Field } from 'formik';
import { EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormTitle } from '../../../../components/form/components/form-title';
import { FormSubmitBtn } from '../../../../components/form/components/form-submit-btn';
import { ButtonLoader } from '../../../../components/button-loader';
import { useDispatch } from 'react-redux';
import { JWT, PATH } from '../../../../utils/config';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../../../services/api/auth-api';
import { setUser } from '../../../../services/user-slice';

export const LoginForm = () => {
  const intl = useIntl();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser, { isLoading, isFetching, isSuccess, isError, error, data }] =
    useLoginUserMutation();

  const fromPage = location.state?.from?.pathname || PATH.HOME;

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

  const handleSubmit = async (values, actions) => {
    if (!isLoading && !isFetching) {
      try {
        const { user, accessToken, refreshToken } = await loginUser(values).unwrap();
        cookies.set(JWT.ACCESS, accessToken.split(' ')[1], {
          maxAge: 1200,
          path: '/',
        });
        cookies.set(JWT.REFRESH, refreshToken, { maxAge: 2400, path: '/' });
        dispatch(setUser({ user, accessToken: accessToken.split(' ')[1] }));
        navigate(fromPage);
      } catch (err) {
        console.error('Failed to login: ', err);
      }
    }

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
            {isLoading ? <ButtonLoader /> : intl.formatMessage({ id: 'login.form.submit' })}
          </FormSubmitBtn>
        </Form>
      )}
    </Formik>
  );
};

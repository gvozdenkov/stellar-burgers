import s from './profile.module.scss';
import clsx from 'clsx';
import { useIntl } from 'react-intl';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useRef } from 'react';
import { FormSubmitBtn } from '../../../../components/form/components/form-submit-btn';
import { ButtonLoader } from '../../../../components/button-loader';
import { useGetMeQuery, useUpdateUserMutation } from '../../../../services/api/user-api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../../services/auth-slice';
import { Navigate } from 'react-router-dom';
import { PATH } from '../../../../utils/config';

export const Profile = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [updateUser, { isLoading, isFetching, isSuccess, isError, error, data: newUser }] =
    useUpdateUserMutation();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const {
    data: user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetMeQuery('getMe', {
    // pollingInterval: 60000,
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true,
  });

  let content;

  if (isErrorUser) {
    content = <Navigate to={PATH.LOGIN} />;
  }

  if (isSuccessUser) {
    const { name, email } = user;

    const initialValues = {
      name,
      email,
      password: '',
    };

    const validationSchema = Yup.object({
      name: Yup.string()
        .min(2, intl.formatMessage({ id: 'form.errors.name.min' }))
        .required(intl.formatMessage({ id: 'form.errors.input.required' })),
      email: Yup.string()
        .email(intl.formatMessage({ id: 'form.errors.email.incorrect' }))
        .required(intl.formatMessage({ id: 'form.errors.input.required' })),
      password: Yup.string()
        .min(3, intl.formatMessage({ id: 'form.errors.password.min' }))
        .required(intl.formatMessage({ id: 'form.errors.input.required' })),
    });

    const handleSubmit = async (values, actions) => {
      if (!isLoading && !isFetching) {
        try {
          const { user } = await updateUser(values).unwrap();
          console.log('isSucess', newUser);
          dispatch(setUser({ user }));
          if (isSuccess) {
          }
          console.log('updated user', newUser);
        } catch (err) {
          console.error('Failed to update user data: ', err);
        }
      }

      actions.resetForm();
    };

    const onIconClick = (ref) => {
      setTimeout(() => {
        ref.current.focus();
        ref.current.select();
      }, 0);
    };

    const FocusInputControl = ({ innerRef, ...props }) => <Input ref={innerRef} {...props} />;

    content = (
      <>
        <section className={clsx(s.profile)}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ errors, isValid, touched, dirty }) => (
              <Form className={clsx(s.form)}>
                <Field
                  name={'name'}
                  type={'text'}
                  as={FocusInputControl}
                  icon={'EditIcon'}
                  innerRef={nameRef}
                  onIconClick={() => onIconClick(nameRef)}
                  extraClass={clsx(s.input_name)}
                  placeholder={intl.formatMessage({ id: 'form.placeholder.name' })}
                  error={touched.name && !!errors.name}
                  errorText={touched.name && errors.name}
                />
                <Field
                  name={'email'}
                  type={'email'}
                  as={FocusInputControl}
                  icon={'EditIcon'}
                  innerRef={emailRef}
                  onIconClick={() => onIconClick(emailRef)}
                  extraClass={clsx(s.input_email)}
                  placeholder={intl.formatMessage({ id: 'form.placeholder.email' })}
                  error={touched.email && !!errors.email}
                  errorText={touched.email && errors.email}
                />
                <Field
                  name={'password'}
                  type={'password'}
                  as={FocusInputControl}
                  icon={'EditIcon'}
                  innerRef={passwordRef}
                  onIconClick={() => onIconClick(passwordRef)}
                  extraClass={clsx(s.input_pwd)}
                  placeholder={intl.formatMessage({ id: 'form.placeholder.password' })}
                  error={touched.password && !!errors.password}
                  errorText={touched.password && errors.password}
                />

                {dirty && (
                  <>
                    <FormSubmitBtn
                      disabled={!isValid || isLoading}
                      extraClass={clsx(s.input_submit)}>
                      {isLoading ? (
                        <ButtonLoader />
                      ) : (
                        intl.formatMessage({ id: 'profile.form.submit' })
                      )}
                    </FormSubmitBtn>
                    <Button type='secondary' htmlType='reset' extraClass={clsx(s.input_cancel)}>
                      {intl.formatMessage({ id: 'profile.form.cancel' })}
                    </Button>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </section>
        <p className={clsx(s.comment, 'text text_type_main-default text_color_inactive')}>
          {intl.formatMessage({ id: 'profile.comment' })}
        </p>
      </>
    );
  }

  return content;
};

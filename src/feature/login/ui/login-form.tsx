import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Input, SubmitButton } from '#shared/ui/form';
import { PasswordInput } from '#shared/ui/form/password-input';
import { useLogInMutation } from '#entities/session';
import { ErrorMessage } from '#shared/ui/error-message';

import s from './login-from.module.scss';

type Props = {
  redirectTo: string;
};

export const LoginForm = ({ redirectTo }: Props) => {
  const { t } = useTranslation();

  const formSchema = z.object({
    email: z.string().email({ message: t('form.input.email.error.incorrect') }),
    password: z.string().nonempty(t('form.input.common.error.required')),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const defaultValues: FormSchema = {
    email: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { isValid, errors },
  } = useForm<FormSchema>({
    defaultValues,
    mode: 'onTouched',
    resolver: zodResolver(formSchema),
  });

  const {
    mutate: loginMutation,
    isError: isLoginMutationError,
    error: loginMutationError,
    isLoading,
  } = useLogInMutation({ redirectTo });

  const mutationErrorText = loginMutationError?.response?.data.message || t('login.error.login');

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    loginMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s['login-form']}>
      <h1 className='text text_type_main-medium'>{t('login.form.title')}</h1>
      <Input
        type='email'
        icon='edit'
        {...register('email')}
        error={!!errors.email}
        errorText={errors.email?.message}
        aria-invalid={errors.email ? 'true' : 'false'}
        placeholder={t('form.input.email.placeholder')}
        extraClass={s.input_email}
        onIconClick={() => setFocus('email')}
        autoComplete='email'
      />
      <PasswordInput
        {...register('password')}
        error={!!errors.password}
        errorText={errors.password?.message}
        aria-invalid={errors.password ? 'true' : 'false'}
        placeholder={t('form.input.password.placeholder')}
        extraClass={s.input_password}
        autoComplete='off'
      />

      <SubmitButton disabled={!isValid || isLoading} extraClass={s.input_submit}>
        {t('login.form.button.submit')}
      </SubmitButton>

      {isLoginMutationError && <ErrorMessage message={mutationErrorText} />}
    </form>
  );
};

import { TextWithLink } from '../../components/text-with-link';
import { PATH } from '../../utils/config';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '../../features/auth';
import { ErrorMessage } from '../../components/error-message';
import { useLocation } from 'react-router-dom';
import { FormView } from '../../components/form/form-view';

export const Login = (props) => {
  const { t } = useTranslation();
  const location = useLocation();
  const redirectAfterLogin = location?.state?.from?.pathname || PATH.HOME;

  return (
    <FormView>
      <LoginForm redirectTo={redirectAfterLogin} />

      {props.outlet && <ErrorMessage message={props.outlet} extraClass='mt-8'/>}

      <TextWithLink
        text={t('login.form.new.register')}
        linkText={t('login.form.new.register.link')}
        href={PATH.REGISTER}
        extraClass='mt-20'
      />
      <TextWithLink
        text={t('login.form.forgot.password')}
        linkText={t('login.form.forgot.password.link')}
        href={PATH.FORGOT_PASSWORD}
        extraClass='mt-4'
      />
    </FormView>
  );
};

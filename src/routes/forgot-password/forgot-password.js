import { TextWithLink } from '../../components/text-with-link';
import { ForgotPasswordForm } from '../../features/auth/components/fogot-password-form';
import { PATH } from '../../utils/config';
import { useTranslation } from 'react-i18next';
import { FormErrorMessage } from '../../components/form-error-message';
import { FormView } from '../../components/form/form-view';

export const ForgotPassword = (props) => {
  const { t } = useTranslation();

  return (
    <FormView>
      <ForgotPasswordForm />

      {props.outlet && <FormErrorMessage message={props.outlet} />}

      <TextWithLink
        text={t('forgot-password.remember.password')}
        linkText={t('forgot-password.remember.password.link')}
        href={PATH.LOGIN}
        extraClass='mt-20'
      />
    </FormView>
  );
};

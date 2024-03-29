import { useMutation } from '@tanstack/react-query';
import { redirect, useNavigate } from 'react-router-dom';
import { AuthService, ResWithMessage, ResetPassword, ResponseError } from '#shared/api';
import { ROUTE } from '#shared/config';
import { CookieService } from '#shared/lib';

export const useResetPasswordMutation = () => {
  const navigate = useNavigate();

  return useMutation<ResWithMessage, ResponseError, ResetPassword>({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      CookieService.removeResetPasswordRights();
      navigate(ROUTE.LOGIN);
    },
  });
};

export const resetPasswordLoader = () => () => {
  const isResetAllowed = CookieService.getResetPasswordRights();

  return isResetAllowed ? null : redirect(ROUTE.FORGOT_PASSWORD);
};

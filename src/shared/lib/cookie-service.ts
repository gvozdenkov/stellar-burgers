import Cookies from 'js-cookie';

const COOKIE = {
  ACCESSTOKEN: 'accessToken',
  REFRESHTOKEN: 'refreshToken',
  RESET_PASSWORD: 'reset-password',
  ORDER_BUN: 'order-bun',
  ORDER_INGREDIENTS: 'order-ingredients',
};

// expires in days: accessToken expires at 20 min: 1/72 of the day
const expiresAccess = 1 / 72;
const expiresRefresh = 7;

const setAccessToken = (accessToken: string) => {
  Cookies.set(COOKIE.ACCESSTOKEN, accessToken, { expires: expiresAccess });
};

const setRefreshToken = (refreshToken: string) => {
  Cookies.set(COOKIE.REFRESHTOKEN, refreshToken, { expires: expiresRefresh });
};

const getAccessToken = () => {
  return Cookies.get(COOKIE.ACCESSTOKEN);
};

const getRefreshToken = () => {
  return Cookies.get(COOKIE.REFRESHTOKEN);
};

const removeTokens = () => {
  Cookies.remove(COOKIE.ACCESSTOKEN);
  Cookies.remove(COOKIE.REFRESHTOKEN);
};

// access to /reset-password route
const setResetPasswordRights = () => {
  Cookies.set(COOKIE.RESET_PASSWORD, '1');
};

const getResetPasswordRights = () => {
  return Cookies.get(COOKIE.RESET_PASSWORD);
};

const removeResetPasswordRights = () => {
  return Cookies.remove(COOKIE.RESET_PASSWORD);
};

export const CookieService = {
  setAccessToken,
  setRefreshToken,
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setResetPasswordRights,
  getResetPasswordRights,
  removeResetPasswordRights,
};

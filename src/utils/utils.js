import {
  CurrencyIcon,
  BurgerIcon,
  LockIcon,
  DragIcon,
  CloseIcon,
  CheckMarkIcon,
  ListIcon,
  ProfileIcon,
  EditIcon,
  InfoIcon,
  ShowIcon,
  HideIcon,
  LogoutIcon,
  DeleteIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  MenuIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useIntl } from 'react-intl';

export const getIcons = (type) => ({
  currency: <CurrencyIcon type={type} />,
  burger: <BurgerIcon type={type} />,
  lock: <LockIcon type={type} />,
  drag: <DragIcon type={type} />,
  close: <CloseIcon type={type} />,
  check: <CheckMarkIcon type={type} />,
  list: <ListIcon type={type} />,
  profile: <ProfileIcon type={type} />,
  edit: <EditIcon type={type} />,
  info: <InfoIcon type={type} />,
  show: <ShowIcon type={type} />,
  hide: <HideIcon type={type} />,
  logout: <LogoutIcon type={type} />,
  delete: <DeleteIcon type={type} />,
  arrowUp: <ArrowUpIcon type={type} />,
  arrowDown: <ArrowDownIcon type={type} />,
  menu: <MenuIcon type={type} />,
  logo: <Logo />,
});

export const IntlConvert = (arr, param) => {
  const intl = useIntl();

  return arr.map((item) => ({
    ...item,
    [param]: intl.formatMessage({ id: item[param] }),
  }));
};

export const findBy = (arr, param) => (value) => arr.find((item) => item[param] === value);

export const log = (msg) => (param) => {
  console.log(msg);
  if (param) {
    console.log(param);
  }
};

export const findConstructorIngredient = (cards, id) => {
  const card = cards.find((card) => card._itemId === id);

  return {
    card,
    index: cards.indexOf(card),
  };
};

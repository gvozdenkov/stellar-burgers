import clsx from 'clsx';
import s from './orders.module.scss';
import { useTranslation } from 'react-i18next';
import { OrderCard, useFeed } from '../../features/feed';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { QUERYKEY } from '../../utils/config';
import { ordersQuery } from './orders-loader';

export const Orders = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const url = 'wss://norma.nomoreparties.space/orders';
  const querykeys = [QUERYKEY.PROFILE_ORDERS];

  const { orders } = useFeed({ url, querykeys, query: ordersQuery });

  return (
    <>
      <section className={clsx(s.orders)}>
        <ul className={clsx(s.orderList, 'customScroll')}>
          {orders?.map((order, index) => {
            return (
              <li key={index} className={clsx(s.orderItem, 'mb-6 pr-2')}>
                <Link to={`${order.number}`} state={{ from: location }} className='reset-link'>
                  <OrderCard {...order} />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <p className={clsx(s.comment, 'text text_type_main-default text_color_inactive')}>
        {t('profile.orders.comment')}
      </p>

      <Outlet />
    </>
  );
};

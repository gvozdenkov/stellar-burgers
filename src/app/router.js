import { createBrowserRouter } from 'react-router-dom';
import { PATH } from '../utils/config';
import { queryClient } from './api-setup';
import { store } from './store';
import { GlobalError } from '../components/global-error';
import { RootLayout } from '../routes/root-layout/root-layout';
import { ingredientsLoader } from '../routes/root-layout/ingredients-loader';

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <RootLayout />,
    errorElement: <RootLayout outlet={<GlobalError />} />,
    loader: ingredientsLoader(queryClient),
    children: [
      {
        path: PATH.HOME,
        lazy: async () => ({
          Component: (await import('../routes/home')).Home,
        }),
        children: [
          {
            path: `${PATH.INGREDIENTS}/:id`,
            lazy: async () => ({
              Component: (await import('../routes/ingredient-modal')).IngredientModal,
            }),
          },
          {
            path: `${PATH.ORDER}/:id`,
            lazy: async () => ({
              Component: (await import('../routes/create-order-modal')).CreateOrderModal,
            }),
          },
        ],
      },

      {
        path: PATH.PROFILE.ROOT,
        lazy: async () => ({
          Component: (await import('../routes/profile-layout')).ProfileLayout,
          action: (await import('../routes/profile-layout/logout-action')).logoutAction(
            store.dispatch,
          ),
          loader: (await import('../routes/profile-layout/user-loader')).userLoader(queryClient),
        }),
        children: [
          {
            children: [
              {
                index: true,
                lazy: async () => ({
                  Component: (await import('../routes/profile')).Profile,
                }),
              },
              {
                path: PATH.PROFILE.ORDERS,
                lazy: async () => ({
                  Component: (await import('../routes/orders')).Orders,
                  loader: (await import('../routes/orders/orders-loader')).ordersLoader(
                    queryClient,
                  ),
                }),
                children: [
                  {
                    path: ':number',
                    lazy: async () => ({
                      Component: (await import('../routes/order-modal')).OrderModal,
                      loader: (
                        await import('../routes/order-modal/order-modal-loader')
                      ).orderModalLoader(queryClient),
                    }),
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: PATH.LOGIN,
        lazy: async () => ({
          Component: (await import('../routes/login')).Login,
        }),
      },
      {
        path: PATH.REGISTER,
        lazy: async () => ({
          Component: (await import('../routes/register')).Register,
        }),
      },
      {
        path: PATH.FORGOT_PASSWORD,
        lazy: async () => ({
          Component: (await import('../routes/forgot-password')).ForgotPassword,
        }),
      },
      {
        path: PATH.RESET_PASSWORD,
        lazy: async () => ({
          Component: (await import('../routes/reset-password')).ResetPassword,
          loader: (
            await import('../routes/reset-password/reset-password-loader')
          ).resetPasswordLoader(),
        }),
      },
      {
        path: PATH.FEED,
        lazy: async () => ({
          Component: (await import('../routes/feed')).Feed,
          loader: (await import('../routes/feed/feed-loader')).feedLoader(queryClient),
        }),
        children: [
          {
            path: ':number',
            lazy: async () => ({
              Component: (await import('../routes/order-modal')).OrderModal,
              loader: (await import('../routes/order-modal/order-modal-loader')).orderModalLoader(
                queryClient,
              ),
            }),
          },
        ],
      },
    ],
  },
]);

import { GlobalError } from '#components/global-error';
import { ROUTES } from '#constants/routes';
import { RootLayout } from '#layout/root-layout';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <RootLayout outlet={<GlobalError />} />,
  },
]);

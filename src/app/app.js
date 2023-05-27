import s from './app.module.scss';
import { Header } from '../components/header';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/home';
import { Login } from '../pages/login';
import { Logout } from '../pages/logout';
import { Register } from '../pages/register';
import { ForgotPassword } from '../pages/forgot-password';
import { ResetPassword } from '../pages/reset-password';
import { NotFound } from '../pages/not-found';
import { ProfileLayout } from '../pages/profile-layout';
import { Profile } from '../pages/profile-layout/components/profile';
import { Orders } from '../pages/profile-layout/components/orders';

export const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <main className={s.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/auth/logout' element={<Logout/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<ProfileLayout />}>
            <Route index element={<Profile />} />
            <Route path='orders' element={<Orders />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};

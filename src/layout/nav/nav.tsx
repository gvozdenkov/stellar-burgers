import { Link } from 'react-router-dom';
import { NavItem } from '../../components/nav-item';
import { navRoutes } from './nav-routes';
import s from './nav.module.scss';
import { ROUTES } from '#constants/routes';
import { Logo } from '#components/logo';

export const Nav = () => {
  return (
    <nav className={s.nav}>
      <ul className={s.navList}>
        {navRoutes.map((item, i) => (
          <NavItem key={i} title={item.title} url={item.url} icon={item.icon} />
        ))}
        <li className={s.logo}>
          <Link to={ROUTES.HOME}>
            <Logo />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

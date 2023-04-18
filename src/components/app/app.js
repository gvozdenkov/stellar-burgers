import s from './app.module.scss';
import { Header } from '../header';
import { Main } from '../main';
import { IngredientContextProvider } from '../../utils/contexts/IngredientContext/IngredientContext';

export const App = () => {
  return (
    <div className={s.app}>
      <IngredientContextProvider>
        <Header />
        <main className={s.main}>
          <Main />
        </main>
      </IngredientContextProvider>
    </div>
  );
};

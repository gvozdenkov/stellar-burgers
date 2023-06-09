import { Counter as CounterUI } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCounter } from './hook/use-counter';

export const Counter = () => {
  const { count } = useCounter();

  return count > 0 && <CounterUI count={count} size='default' />;
};

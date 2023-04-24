import { useCartContext } from '../../../utils/contexts/CartContext';
import { useCardContext } from './useCardContext';

export const useCounter = () => {
  const product = useCardContext();
  const { cart } = useCartContext();

  const count =
    cart.buns.filter((bun) => bun._id === product._id).length +
    cart.ingredients.filter((ingredient) => ingredient._id === product._id).length;

  return { count };
};
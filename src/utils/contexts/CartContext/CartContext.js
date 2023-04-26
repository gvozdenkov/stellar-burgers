import { createContext, useContext, useMemo, useReducer } from 'react';
import { useIngredientContext } from '../IngredientContext/IngredientContext';
import { addIngredientAction } from './actions';
import { reducer } from './reducer';
import { INGREDIENT } from '../../constants';

const CartContext = createContext();
const CartDispatchContext = createContext();

export const useCartContext = () => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('You try to use useCartContext outside of its provider!');
  }

  return context;
};

export const useCartDispatchContext = () => {
  const context = useContext(CartDispatchContext);

  if (context === undefined) {
    throw new Error('You try to use useCartDispatchContext outside of its provider!');
  }

  return context;
};

export const CartContextProvider = ({ children }) => {
  const { ingredients } = useIngredientContext();

  const randomBun = useMemo(() => {
    const buns = ingredients.filter((ingredient) => ingredient.type === INGREDIENT.BUN);
    return buns[Math.floor(Math.random() * buns.length)];
  }, [ingredients]);

  const initialState = {
    buns: [randomBun, randomBun],
    ingredients: [],
  };

  const [cart, dispatch] = useReducer(reducer, initialState);

  const totalPrice = useMemo(() => {
    const bunsPrice = cart.buns.reduce((sum, ingredient) => sum + ingredient.price, 0);
    const ingredientsPrice = cart.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0,
    );
    return bunsPrice + ingredientsPrice;
  }, [cart.buns, cart.ingredients]);

  const dispatchMethods = {
    addIngredient: (ingredient) => dispatch(addIngredientAction(ingredient)),
  };

  return (
    <CartContext.Provider value={{ cart, totalPrice }}>
      <CartDispatchContext.Provider value={dispatchMethods}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
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

  const buns = ingredients.filter((ingredient) => ingredient.type === INGREDIENT.BUN);
  const randomBun = buns[Math.floor(Math.random() * buns.length)];
  const initialState = {
    cartItems: [randomBun, randomBun],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getTotalPrice = useCallback(() => {
    return state.cartItems.reduce((sum, ingredient) => sum + ingredient.price, 0);
  }, [state.cartItems]);

  const addIngredient = useCallback((ingredient) => dispatch(addIngredientAction(ingredient)), []);

  const dispatchMethods = useMemo(
    () => ({
      getTotalPrice,
      addIngredient,
    }),
    [getTotalPrice, addIngredient],
  );

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatchMethods}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

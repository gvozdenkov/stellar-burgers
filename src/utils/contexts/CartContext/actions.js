export const actions = {
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  REMOVE_INGREDIENT: 'REMOVE_INGREDIENT',
  GET_TOTAL_PRICE: 'GET_TOTAL_PRICE',
};

export const addIngredientAction = ({ ingredient }) => ({
  type: actions.ADD_INGREDIENT,
  ingredient,
});

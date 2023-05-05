import { configureStore } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from '../services/burger-constructor-slice';
import { ingredientDetailsReducer } from '../services/ingredient-details-slice';
import { apiSlice } from '../services/api-slice';
import { ordersReducer } from '../services/order-slice';

export const store = configureStore({
  reducer: {
    ingredientDetails: ingredientDetailsReducer,
    burgerConstructor: burgerConstructorReducer,
    orders: ordersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});
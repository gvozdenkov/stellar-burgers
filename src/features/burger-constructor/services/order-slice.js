import { createSlice, nanoid } from '@reduxjs/toolkit';
import { arrayMove } from '@dnd-kit/sortable';

const initialState = {
  bun: {},
  ingredients: [],
  orderItems: [],
};

const setOrderItems = (state) => {
  const ingredientIds = [...state.ingredients].map((item) => item._id);
  return state.bun._id ? [state.bun._id, ...ingredientIds, state.bun._id] : [...ingredientIds];
};

const findIndex = (state, id) => {
  const element = state.ingredients.find((element) => element._itemId === id);
  return state.ingredients.indexOf(element);
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    bunAdded: {
      reducer(state, action) {
        state.bun = action.payload;
        state.orderItems = setOrderItems(state);
      },

      prepare(id, price) {
        return {
          payload: {
            _id: id,
            price,
          },
        };
      },
    },

    ingredientAdded: {
      reducer(state, action) {
        state.ingredients.push(action.payload);
        state.orderItems = setOrderItems(state);
      },

      prepare(id, price) {
        return {
          payload: {
            _id: id,
            price,
            _itemId: nanoid(),
          },
        };
      },
    },

    ingredientRemoved(state, action) {
      const deletedId = action.payload;

      state.ingredients = state.ingredients.filter((item) => item._itemId !== deletedId);
      state.orderItems = setOrderItems(state);
    },

    ingredientMoved: {
      reducer(state, action) {
        const { activeId, overId } = action.payload;
        const activeIndex = findIndex(state, activeId);
        const overIndex = findIndex(state, overId);
        state.ingredients = arrayMove(state.ingredients, activeIndex, overIndex);
        state.orderItems = setOrderItems(state);
      },

      prepare(activeId, overId) {
        return {
          payload: {
            activeId,
            overId,
          },
        };
      },
    },

    orderReseted(state, action) {
      state.bun = {};
      state.ingredients = [];
      state.orderItems = setOrderItems(state);
    },
  },
});

export const { bunAdded, ingredientAdded, ingredientRemoved, ingredientMoved, orderReseted } =
  orderSlice.actions;

const orderReducer = orderSlice.reducer;

export const selectOrder = (state) => state.order;
export const selectOrderIngredients = (state) => state.order.ingredients;
export const selectAllOrderItems = (state) => state.order.orderItems;

export { orderReducer };

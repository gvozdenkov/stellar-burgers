import { useMemo } from 'react';
import { useIngredientContext } from '../../utils/contexts/IngredientContext';

export const useCategoryList = ({ types }) => {
  const { ingredients } = useIngredientContext();

  // Return array of objects with this shape:
  // [
  //    { ingredients: [], text: 'Булки', type: 'bun' },
  //    { ingredients: [], text: 'Начинки', type: 'main' },
  //    { ingredients: [], text: 'Соусы', type: 'sauce' },
  // ]
  const categorys = useMemo(
    () =>
      types.reduce(
        (o, type) => [
          ...o,
          {
            ingredients: ingredients.filter((ingredient) => ingredient.type === type.type),
            text: type.text,
            type: type.type,
          },
        ],
        [],
      ),
    [ingredients, types],
  );

  return { categorys };
};

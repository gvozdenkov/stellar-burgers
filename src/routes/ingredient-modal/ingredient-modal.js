import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'react-router-dom';
import { Modal } from '../../components/modal';
import { useTranslation } from 'react-i18next';
import { IngredientDetails } from './components/ingredient-details';
import { ModalFullScreen } from '../../components/modal-fullscreen';
import { ingredientsQuery } from '../../routes/root-layout/ingredients-loader';

export const IngredientModal = () => {
  const { data: ingredientsObj } = useQuery(ingredientsQuery());
  const { id } = useParams();
  const location = useLocation();
  const { t } = useTranslation();

  const isFromHome = !!location.state;
  const ingredient = ingredientsObj[id];

  return isFromHome ? (
    <Modal title={t('ingredients.detail.popup.title')}>
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  ) : (
    <ModalFullScreen title={t('ingredients.detail.popup.title')}>
      <IngredientDetails ingredient={ingredient} />
    </ModalFullScreen>
  );
};

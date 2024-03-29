import { useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IngredientDetails, useGetIngredientsQuery } from '#widgets/burger-ingredients';
import { Modal } from '#shared/ui/modal';
import { ModalFullScreen } from '#shared/ui/modal-fullscreen';

export const IngredientModal = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data } = useGetIngredientsQuery();
  const location = useLocation();

  const { ingredientsObj } = data!;
  const ingredient = ingredientsObj[id!];

  const isFromHome = !!location.state;

  return isFromHome ? (
    <Modal>
      <Modal.Overlay>
        <Modal.Content>
          <Modal.Header>
            <h3 className='text text_type_main-large'>{t('ingredient.popup.title')}</h3>
          </Modal.Header>
          <IngredientDetails ingredient={ingredient} />
        </Modal.Content>
      </Modal.Overlay>
    </Modal>
  ) : (
    <ModalFullScreen>
      <IngredientDetails ingredient={ingredient} extraClass='mt-30' />
    </ModalFullScreen>
  );
};

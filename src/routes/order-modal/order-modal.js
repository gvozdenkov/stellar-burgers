import { useLocation, useParams } from 'react-router-dom';
import { Modal } from '../../components/modal';
import { ModalFullScreen } from '../../components/modal-fullscreen';
import s from './order-modal.module.scss';
import { OrderDetails } from '../../features/order-feed';

export const OrderModal = () => {
  const { id } = useParams();
  const location = useLocation();

  const isFromHome = !!location.state;

  return isFromHome ? (
    <Modal title={`#${id}`}>
      <OrderDetails number={id} />
    </Modal>
  ) : (
    <ModalFullScreen>
      <div className={s.orderFullScreen}>
        <OrderDetails number={id} />
      </div>
    </ModalFullScreen>
  );
};

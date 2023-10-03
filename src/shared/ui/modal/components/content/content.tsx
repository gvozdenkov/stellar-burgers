import { useModalContext } from '#shared/modal/context/modal-context';
import { clx } from '#shared/lib';
import { PropsWithChildren } from 'react';
import s from './content.module.scss';

export const Content = ({ children }: PropsWithChildren) => {
  useModalContext();

  return (
    <div
      className={clx(s.modal)}
      role='dialog'
      // aria-labelledby={title ? 'modal-title' : 'modal-title-aria'}
      aria-modal='true'
      onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};
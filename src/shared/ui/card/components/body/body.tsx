import { clx } from '#shared/lib';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  extraClass?: string;
};

export const Body = ({ extraClass = '', children }: Props) => {
  return <div className={clx({ [extraClass]: !!extraClass })}>{children}</div>;
};

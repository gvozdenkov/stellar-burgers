import { useEffect, useState } from 'react';
import { useGetIngredientsQuery } from '../services/api/api';

export const useApp = () => {
  const { isLoading, isSuccess, isError, error } = useGetIngredientsQuery();
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

  const closeErrorModal = () => setIsOpenErrorModal(false);

  useEffect(() => {
    if (isError) setIsOpenErrorModal(true);
  }, [isError]);

  return {
    isLoading,
    isSuccess,
    error,
    closeErrorModal,
    isOpenErrorModal,
  };
};

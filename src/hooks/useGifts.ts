import { useState } from 'react';
import { Gift } from '../types';

export const useGifts = () => {
  const initialGiftsState = () => {
    const localStorageGifts = localStorage.getItem('gifts');
    return localStorageGifts
      ? [...JSON.parse(localStorage.getItem('gifts')!)]
      : [];
  };

  const [gifts, setGifts] = useState<Gift[]>(initialGiftsState);
  const [gift, setGift] = useState<Gift>({
    name: '',
    imgUrl: '',
    quantity: 1,
    id: 0,
  });

  return { gift, gifts, setGift, setGifts, initialGiftsState };
};

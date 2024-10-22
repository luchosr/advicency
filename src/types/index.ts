export type Gift = {
  name: string;
  id: number;
  imgUrl: string;
  quantity: number;
};

export enum TextStrings {
  mainHeader = 'Regalos:',
  mainInputButton = 'Agregar',
  clearGiftsButton = 'Borrar lista',
  fallbackText = 'No hay regalos Grinch. Agrega uno!',
  quantityPlaceholder = ' x ',
  deleteGiftButton = '❌',
  MAX_ITEMS = '5',
  MIN_ITEMS = '1',
}

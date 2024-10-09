import { useEffect, useMemo, useState } from 'react';
import './index.css';

type Gift = {
  name: string;
  id: number;
  quantity: number;
};

enum TextStrings {
  mainHeader = 'Regalos:',
  mainInputButton = 'Agregar',
  clearGiftsButton = 'Borrar lista',
  fallbackText = 'No hay regalos Grinch. Agrega uno!',
  quantityPlaceholder = ' x ',
  deleteGiftButton = '❌',
  MAX_ITEMS = '5',
  MIN_ITEMS = '1',
}

const initialGiftState: Gift = {
  name: '',
  quantity: 1,
  id: 0,
};

const initialGiftsState = () => {
  const localStorageGifts = localStorage.getItem('gifts');
  return localStorageGifts
    ? [...JSON.parse(localStorage.getItem('gifts')!)]
    : [];
};
export default function App() {
  const [gift, setGift] = useState<Gift>(initialGiftState);
  const [gifts, setGifts] = useState<Gift[]>(initialGiftsState);

  useEffect(() => {
    localStorage.setItem('gifts', JSON.stringify(gifts));
  }, [gifts]);

  const isGiftAlreadyAdded = useMemo(
    () => gifts.some((addedGift) => addedGift.name === gift.name),
    [gifts, gift.name]
  );
  const handleGiftSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!gift.name) {
      alert('Debes agregar un regalo');
      return;
    }

    if (isGiftAlreadyAdded) {
      const newGiftArray = gifts.filter(
        (addedGift) => addedGift.name !== gift.name
      );
      setGifts([...newGiftArray, gift]);
    } else {
      setGifts([...gifts, gift]);
    }
    setGift(initialGiftState);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGift({
      ...gift,
      [event.target.name]: event.target.value,
      id: +Date.now(),
    });
  };

  const handleGiftDelete = (id: Gift['id']) => {
    setGifts(gifts.filter((gift) => gift.id !== id));
  };

  const handleGiftClear = () => {
    setGifts([]);
  };
  return (
    <main className=" flex items-center justify-center h-screen bg-xmass bg-cover ">
      <div className=" flex items-center justify-center flex-col border border-red-600 border-4 w-auto pt-6 bg-white">
        <h1 className="text-5xl font-bold underline mb-6 font-xmas-font ">
          {TextStrings.mainHeader}
        </h1>

        <form
          action=""
          onSubmit={handleGiftSubmit}
          className="flex flex-row justify-between mx-4 w-96"
        >
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={gift.name}
            placeholder="Ingresa un regalo"
            className="border border-green-300 rounded-md border-2 px-2 w-1/2 "
          />
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={gift.quantity}
            min={TextStrings.MIN_ITEMS}
            max={TextStrings.MAX_ITEMS}
            onChange={handleInputChange}
            className="px-2 border border-black w-12 rounded-md"
          />

          <button
            type="submit"
            className="border rounded-md border-red-500 mx-2 p-2 bg-red-400 text-slate-50 font-bold"
          >
            {TextStrings.mainInputButton}
          </button>
        </form>
        {gifts.length > 0 ? (
          <ul className="flex flex-col justify-start w-full px-6 pt-4">
            {gifts.map((gift) => (
              <article
                key={gift.id}
                className="w-full flex flex-row justify-between"
              >
                <li>
                  {gift.name}
                  {gift.quantity === 1
                    ? ''
                    : `${TextStrings.quantityPlaceholder}${gift.quantity}`}
                </li>
                <button
                  className="border bg-green-300 rounded-md text-slate-50 p-1"
                  onClick={() => handleGiftDelete(gift.id)}
                >
                  {TextStrings.deleteGiftButton}
                </button>
              </article>
            ))}
          </ul>
        ) : (
          <article className="m-4">
            <p className="font-xmas-font font-bold text-xl">
              {TextStrings.fallbackText}
            </p>
          </article>
        )}

        <button
          className="w-11/12 border rounded-md border-red-500 m-2 p-2 bg-red-400 text-slate-50 font-bold"
          onClick={handleGiftClear}
        >
          {TextStrings.clearGiftsButton}
        </button>
      </div>
    </main>
  );
}

import { useState } from 'react';
import './index.css';

type Gift = {
  name: string;
  id: number;
};

enum TextStrings {
  mainHeader = 'Regalos:',
  mainInputButton = 'Agregar',
  clearGiftsButton = 'Borrar lista',
  fallbackText = 'No hay regalos Grinch. Agrega uno!',
}
export default function App() {
  const [gift, setGift] = useState<Gift['name']>('');
  const [gifts, setGifts] = useState<Gift[]>([]);

  const handleGiftSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isGiftAlreadyAdded = gifts.some(
      (addedGift) => addedGift.name === gift
    );
    if (gift === '' || isGiftAlreadyAdded) {
      return;
    }
    setGifts([...gifts, { name: gift, id: +Date.now() }]);
    setGift('');
  };
  const handleGiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGift(event.target.value);
  };

  const handleGiftDelete = (id: Gift['id']) => {
    setGifts(gifts.filter((gift) => gift.id !== id));
  };

  const handleGiftClear = () => {
    setGifts([]);
  };
  return (
    <main className=" flex items-center justify-center h-screen bg-xmass bg-cover ">
      <div className=" flex items-center justify-center flex-col border border-red-600 border-4 w-80  pt-6 bg-white">
        <h1 className="text-5xl font-bold underline mb-6 font-xmas-font ">
          {TextStrings.mainHeader}
        </h1>

        <form action="" onSubmit={handleGiftSubmit}>
          <input
            type="text"
            onChange={handleGiftChange}
            value={gift}
            className="border border-green-300 rounded-md border-2 px-2 "
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
              <article className="w-full flex flex-row justify-between">
                <li key={gift.id}>{gift.name} </li>
                <button
                  className="border bg-red-800 rounded-md text-slate-50 p-1"
                  onClick={() => handleGiftDelete(gift.id)}
                >
                  ❌
                </button>
              </article>
            ))}
          </ul>
        ) : (
          <article className="m-4">
            <p>{TextStrings.fallbackText}</p>
          </article>
        )}

        <button
          className="border rounded-md border-red-500 m-2 p-2 bg-red-400 text-slate-50 font-bold"
          onClick={handleGiftClear}
        >
          {TextStrings.clearGiftsButton}
        </button>
      </div>
    </main>
  );
}

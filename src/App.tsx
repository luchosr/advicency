import { useState } from 'react';
import './index.css';

type Gift = {
  name: string;
  id: number;
};
export default function App() {
  const [gift, setGift] = useState<Gift['name']>('');
  const [gifts, setGifts] = useState<Gift[]>([]);

  const handleGiftSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    <main className=" flex items-center  justify-center h-screen bg-xmass bg-cover ">
      {/* --- Inicio mensaje a borrar */}
      {/* <div
        style={{
          margin: 24,
          padding: 12,
          backgroundColor: 'gold',
          display: 'grid',
          borderRadius: 4,
          gap: 12,
        }}
        >
        <p>
          🔔 Recordá que la idea es empezar la app de 0 cada día, no editar la
          del día anterior, si no te dan los tiempos o te parece mucho, editá la
          anterior, mejor poco que nada! 🔔
          </p>
          
          <p>Borrá esta caja y empezá!</p>
        </div> */}
      {/* --- Fin mensaje a borrar */}

      <div className=" flex items-center  justify-center flex-col 	border border-red-600 border-4 w-80   pt-6  bg-white">
        {/* <div className="bg-white "> */}
        <h1 className="text-5xl font-bold underline mb-6 font-xmas-font ">
          Regalos:
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
            Agregar
          </button>
        </form>
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
        <button
          className="border rounded-md border-red-500 m-2 p-2 bg-red-400 text-slate-50 font-bold"
          onClick={handleGiftClear}
        >
          Borrar todos los regalos
        </button>
      </div>
    </main>
  );
}

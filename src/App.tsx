import { useEffect, useMemo } from "react";
import "./index.css";
import { useGifts } from "./hooks/useGifts";
import { Gift, TextStrings } from "./types";

export default function App() {
  const { gift, gifts, setGift, setGifts } = useGifts();

  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(gifts));
  }, [gifts]);

  const isGiftAlreadyAdded = useMemo(
    () =>
      gifts.some(
        (addedGift) => addedGift.name.toLowerCase() === gift.name.toLowerCase(),
      ),
    [gifts, gift.name],
  );

  // const gifts = ['calcetines', 'chupetines', 'cuchillos'];
  const handleGiftSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!gift.name) {
      alert("Debes agregar un regalo");
      return;
    }

    if (isGiftAlreadyAdded) {
      const newGiftArray = gifts.filter(
        (addedGift) => addedGift.name !== gift.name,
      );
      setGifts([...newGiftArray, gift]);
    } else {
      setGifts([...gifts, gift]);
    }
    setGift({
      name: "",
      imgUrl: "",
      quantity: 1,
      id: 0,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGift({
      ...gift,
      [event.target.name]: event.target.value,
      id: +Date.now(),
    });
  };

  const handleGiftDelete = (id: Gift["id"]) => {
    setGifts(gifts.filter((gift) => gift.id !== id));
  };

  const handleGiftClear = () => {
    setGifts([]);
  };
  return (
    <main className="flex h-screen items-center justify-center bg-xmass bg-cover">
      <div className="flex w-auto flex-col items-center justify-center rounded-md border border-4 border-red-600 bg-white pt-6">
        <h1 className="mb-6 font-xmas-font text-5xl font-bold underline">
          {TextStrings.mainHeader}
        </h1>

        <form
          action=""
          onSubmit={handleGiftSubmit}
          className="mx-4 flex w-full flex-row justify-between px-4"
        >
          <input
            type="text"
            name="name"
            onChange={handleInputChange}
            value={gift.name}
            placeholder="Ingresa un regalo"
            className="w-1/3 rounded-md border border-2 border-green-300 px-2"
          />

          <input
            type="text"
            name="imgUrl"
            onChange={handleInputChange}
            value={gift.imgUrl}
            placeholder="URL Imagen:"
            className="w-1/4 rounded-md border border-2 border-green-300 px-2"
          />
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={gift.quantity}
            min={TextStrings.MIN_ITEMS}
            max={TextStrings.MAX_ITEMS}
            onChange={handleInputChange}
            className="w-12 rounded-md border border-green-300 px-2"
          />

          <button
            type="submit"
            className="mx-2 rounded-md border border-red-500 bg-red-400 p-2 font-bold text-slate-50"
          >
            {TextStrings.mainInputButton}
          </button>
        </form>
        {gifts.length > 0 ? (
          <ul className="flex w-full flex-col justify-start px-6 pt-4">
            {gifts.map((gift) => (
              <article
                key={gift.id}
                className="flex w-full flex-row justify-between"
              >
                <li className="my-2 flex h-10 flex-row capitalize">
                  <img
                    src={gift.imgUrl}
                    alt={gift.name}
                    width={40}
                    height={40}
                  />
                  <span className="px-2 pt-2">
                    {gift.name}
                    {gift.quantity === 1
                      ? ""
                      : `${TextStrings.quantityPlaceholder}${gift.quantity}`}
                  </span>
                </li>
                <button
                  className="rounded-md border bg-green-300 p-1 text-slate-50"
                  onClick={() => handleGiftDelete(gift.id)}
                >
                  {TextStrings.deleteGiftButton}
                </button>
              </article>
            ))}
          </ul>
        ) : (
          <article className="m-4">
            <p className="font-xmas-font text-xl font-bold">
              {TextStrings.fallbackText}
            </p>
          </article>
        )}

        <button
          className="m-2 w-11/12 rounded-md border border-red-500 bg-red-400 p-2 font-bold text-slate-50"
          onClick={handleGiftClear}
        >
          {TextStrings.clearGiftsButton}
        </button>
      </div>
    </main>
  );
}

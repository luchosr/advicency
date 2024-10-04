import { useState } from 'react'
import './index.css'

export default function App() {
  const [gifts, setGifts] = useState(['medias', 'camiseta', 'gafas'])
  return (
    <main className="flex justify-center h-screen bg-xmass bg-cover ">
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

      <div className=" flex flex-col w-80 h-52 pt-6 items-center  mt-64 bg-white">
        <h1 className="text-5xl font-bold underline mb-6 font-xmas-font ">
          Regalos:
        </h1>
        <ul>
          {gifts.map((gift) => (
            <li key={gift}>{gift}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

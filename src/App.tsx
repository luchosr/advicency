import { useState } from 'react'
import './index.css'

export default function App() {
  const [gifts, setGifts] = useState(['medias', 'camiseta', 'gafas'])
  return (
    <main className="flex flex-col items-center h-screen bg-xmass bg-cover ">
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
      <h1 className="text-3xl font-bold underline mt-80 mb-6">Regalos:</h1>
      <div className="w-full flex justify-center">
        <ul>
          {gifts.map((gift) => (
            <li key={gift}>{gift}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}

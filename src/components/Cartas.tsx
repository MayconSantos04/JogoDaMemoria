"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Cartas() {
  const cartasOriginais = [
    {
      id: 1,
      Image: "/image copy 2.png",
    },
    {
      id: 2,
      Image: "/image copy 2.png",
    },
    {
      id: 3,
      Image: "/image copy 3.png",
    },
    {
      id: 4,
      Image: "/image copy 3.png",
    },
    {
      id: 5,
      Image: "/image copy 4.png",
    },
    { id: 6, Image: "/image copy 4.png" },
    { id: 7, Image: "/image copy 5.png" },
    { id: 8, Image: "/image copy 5.png" },
    { id: 9, Image: "/image copy 6.png" },
    {
      id: 10,
      Image: "/image copy 6.png",
    },
    {
      id: 11,
      Image: "/image copy 7.png",
    },
    {
      id: 12,
      Image: "/image copy 7.png",
    },
    {
      id: 13,
      Image: "/image copy.png",
    },
    {
      id: 14,
      Image: "/image copy.png",
    },
    {
      id: 15,
      Image: "/image.png",
    },
    {
      id: 16,
      Image: "/image.png",
    },
  ];

  const [cartas, setCartas] = useState(
    cartasOriginais.map((carta) => ({ ...carta, virada: false }))
  );

  const [cartasViradas, setCartasViradas] = useState<number[]>([]);

  const buscarId = (id: number) => {
    if (cartasViradas.length >= 2 ) return

    setCartasViradas((prev) => [...prev, id])

    setCartas((prevCartas) =>
      prevCartas.map((carta) =>
        carta.id === id ? { ...carta, virada: true } : carta
      )
    );
  };

  useEffect(() => {
    if (cartasViradas.length === 2) {
      const timeout = setTimeout(() => {
        setCartas((prevCartas) =>
          prevCartas.map((carta) =>
            cartasViradas.includes(carta.id)
              ? { ...carta, virada: false }
              : carta
          )
        );
        setCartasViradas([]);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [cartasViradas]);

  return (
    <div className="grid grid-cols-4 gap-2">
      {cartas.map((carta) => (
        <button
          key={carta.id}
          onClick={() => buscarId(carta.id)}
          className="bg-gradient-to-r bg-amber-900, bg-amber-950, bg-black rounded flex items-center justify-center cursor-pointer"
        >
          {carta.virada ? (
            <Image
              className="rounded border-2 border-solid"
              src={carta.Image}
              alt="carta"
              height={140}
              width={140}
            />
          ) : (
            <Image
              className="rounded bg border-2 border-solid"
              src="/image copy 8.png"
              alt="carta"
              height={140}
              width={140}
            />
          )}
        </button>
      ))}
    </div>
  );
}

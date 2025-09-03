"use client";

import Image from "next/image";
import { useState } from "react";

export default function Cartas() {
  const [virarCartas, setVirarCartas] = useState(false);

  const cartas = [
    {
      id: 1,
      Image: "/image copy 2.png",
      virarCartas: Boolean,
    },
    {
      id: 2,
      Image: "/image copy 2.png",
      virarCartas: Boolean,
    },
    {
      id: 3,
      Image: "/image copy 3.png",
      virarCartas: Boolean,
    },
    {
      id: 4,
      Image: "/image copy 3.png",
      virarCartas: Boolean,
    },
    {
      id: 5,
      Image: "/image copy 4.png",
      virarCartas: Boolean,
    },
    {
      id: 6,
      Image: "/image copy 4.png",
      virarCartas: Boolean,
    },
    {
      id: 7,
      Image: "/image copy 5.png",
      virarCartas: Boolean,
    },
    {
      id: 8,
      Image: "/image copy 5.png",
      virarCartas: Boolean,
    },
    {
      id: 9,
      Image: "/image copy 6.png",
      virarCartas: Boolean,
    },
    {
      id: 10,
      Image: "/image copy 6.png",
      virarCartas: Boolean,
    },
    {
      id: 11,
      Image: "/image copy 7.png",
      virarCartas: Boolean,
    },
    {
      id: 12,
      Image: "/image copy 7.png",
      virarCartas: Boolean,
    },
    {
      id: 13,
      Image: "/image copy.png",
      virarCartas: Boolean,
    },
    {
      id: 14,
      Image: "/image copy.png",
      virarCartas: Boolean,
    },
    {
      id: 15,
      Image: "/image.png",
      virarCartas: Boolean,
    },
    {
      id: 16,
      Image: "/image.png",
      virarCartas: Boolean,
    },
  ];

  return (
    <button
      onClick={() => {
        setVirarCartas(!virarCartas);
      }}
      className="grid grid-cols-4 gap-2 cursor-pointer"
    >
      {cartas.map((carta) => (
        <div
          className="bg-amber-500 rounded-2xl flex items-center justify-center"
          key={carta.id}
        >
          <Image
            className="rounded-2xl border-2 border-solid "
            src={carta.Image}
            alt="carta"
            height={140}
            width={140}
          />
        </div>

      ))}
    </button>
  );
}

"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

type Carta = {
  id: number;
  img: string;
  virada: boolean;
  encontrada: boolean;
};

export default function JogoMemoria() {
  const imagens = [
    "/image copy 2.png",
    "/image copy 3.png",
    "/image copy 4.png",
    "/image copy 5.png",
    "/image copy 6.png",
    "/image copy 7.png",
    "/image copy.png",
    "/image.png",
  ];

  const gerarCartas = () => {
    const pares = imagens.flatMap((img, index) => [
      { id: index * 2 + 1, img, virada: false, encontrada: false },
      { id: index * 2 + 2, img, virada: false, encontrada: false },
    ]);
    return pares.sort(() => Math.random() - 0.5);
  };

  const [cartas, setCartas] = useState<Carta[]>(gerarCartas());
  const [cartasViradas, setCartasViradas] = useState<number[]>([]);
  const [pontos, setPontos] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [jogando, setJogando] = useState(false);
  const [vitoria, setVitoria] = useState(false);

  useEffect(() => {
    let intervalo: NodeJS.Timeout | null = null;
    if (jogando && !vitoria) intervalo = setInterval(() => setTempo((t) => t + 1), 1000);
    return () => intervalo && clearInterval(intervalo);
  }, [jogando, vitoria]);

  useEffect(() => {
    if (cartasViradas.length === 2) {
      const [a, b] = cartasViradas;
      const c1 = cartas.find((c) => c.id === a);
      const c2 = cartas.find((c) => c.id === b);
      if (c1 && c2) {
        if (c1.img === c2.img) {
          setCartas((prev) =>
            prev.map((c) => (c.img === c1.img ? { ...c, encontrada: true } : c))
          );
          setPontos((p) => p + 10);
          setCartasViradas([]);
        } else {
          setTimeout(() => {
            setCartas((prev) =>
              prev.map((c) =>
                cartasViradas.includes(c.id) ? { ...c, virada: false } : c
              )
            );
            setCartasViradas([]);
          }, 1000);
        }
      }
    }
  }, [cartasViradas]);

  useEffect(() => {
    if (cartas.every((c) => c.encontrada)) {
      setVitoria(true);
      setJogando(false);
    }
  }, [cartas]);

  const virarCarta = (id: number) => {
    if (!jogando) setJogando(true);
    if (cartasViradas.length >= 2) return;
    setCartasViradas((prev) => [...prev, id]);
    setCartas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, virada: true } : c))
    );
  };

  const reiniciar = () => {
    setCartas(gerarCartas());
    setCartasViradas([]);
    setPontos(0);
    setTempo(0);
    setJogando(false);
    setVitoria(false);
  };

  const formatarTempo = (s: number) => {
    const min = Math.floor(s / 60);
    const seg = s % 60;
    return `${min.toString().padStart(2, "0")}:${seg.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Jogo da Memória</h1>

      <div className="flex gap-6 mb-4 text-base font-medium text-gray-700">
        <span>Tempo: {formatarTempo(tempo)}</span>
        <span>Pontos: {pontos}</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cartas.map((carta) => (
          <button
            key={carta.id}
            onClick={() =>
              !carta.virada && !carta.encontrada && virarCarta(carta.id)
            }
            className={`w-[130px] h-[130px] rounded-md flex items-center justify-center transition ${
              carta.encontrada
                ? "bg-green-400"
                : carta.virada
                ? "bg-gray-100"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
          >
            {carta.virada || carta.encontrada ? (
              <Image
                src={carta.img}
                alt="carta"
                width={120}
                height={120}
                className="rounded-md"
              />
            ) : (
              <Image
                src="/image copy 8.png"
                alt="verso"
                width={120}
                height={120}
                className="rounded-md"
              />
            )}
          </button>
        ))}
      </div>

      {vitoria && (
        <div className="mt-4 text-xl font-semibold text-green-600">
          Parabéns! Você completou o jogo.
        </div>
      )}

      <button
        onClick={reiniciar}
        className="mt-6 bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded text-sm font-medium"
      >
        Reiniciar
      </button>
    </div>
  );
}

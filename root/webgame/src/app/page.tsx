"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const count = 20;
  const [config, setConfig] = useState(false);
  const [snake, setSnake] = useState([
    {x: 3, y: 1},
    {x: 4, y: 1},
    {x: 5, y: 1},
    {x: 6, y: 1},
  ]);
  const [map,setMap] = useState({x:-1, y:0})
  useEffect(() => {
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + map.x, y: head.y + map.y };

        const next = [newHead, ...prev];
        next.pop();
        return next;
      });
    }, 100);

    return () => clearInterval(interval)
  }, [map])

  const getTypeBoard = (x: number, y: number) => {
    if (snake[0].x === x && snake[0].y === y) return "head";
    if (snake.some((s) => s.x === x && s.y === y)) return "body";
    return "empty";
  };

  return (
    <section className="flex justify-center items-center h-dvh">
      <section className="w-[50vw] aspect-square border border-black">
        <div 
        className="grid" 
        style={{gridTemplateColumns : `repeat(${count},1fr)` }}>
          {
            Array.from({ length: count }).map((_v, key1) => {
              return Array.from({ length: count }).map((_v, key2) => {
                const type = getTypeBoard(key2, key1);
                return (
                  <div
                    key={`matrix-${key1}-${key2}`}
                    className={`w-full aspect-square border border-blue-300 ${type === 'head' ? 'bg-amber-300' : ''} ${type === 'body' ? 'bg-sky-300' : ''}`}
                  ></div>
                );
              });
            })
          }
        </div>
      </section>

    </section>
  );
}

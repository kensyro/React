"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Play, Pause } from 'lucide-react';

type SymmetryType = {
    x: number,
    y: number
  };

export default function Home() {
  const count = 20;
  const [snake, setSnake] = useState<Array<SymmetryType>>([
    {x: 10, y: 1},
    {x: 11, y: 1},
    {x: 12, y: 1},
    {x: 13, y: 1},
  ]);
  const [checkpoint, setCheckPoint] = useState<Array<SymmetryType>>([]);
  const [map,setMap] = useState<SymmetryType>({x:0, y:1})
  const [isOver, setIsOver] = useState<boolean>(false);
  const [isPause,setIsPause] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  
 useEffect(() => {
  const handleArrow = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        handleUp();
        break;
      case "ArrowDown":
        handleDown();
        break;
      case "ArrowLeft":
        handleLeft();
        break;
      case "ArrowRight":
        handleRight();
        break;
      default:
        break;
    }
  };

  window.addEventListener("keydown", handleArrow);

  // Hàm dọn dẹp: sẽ được gọi khi component unmount
  return () => {
    window.removeEventListener("keydown", handleArrow);
  };
}, [map]);
  
  useEffect(() => {
    if (isOver || isPause) return;
    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        const newHead = { x: head.x + map.x, y: head.y + map.y };
        if(newHead.x < 0 || newHead.x >= count ||
          newHead.y < 0 || newHead.y >= count
        ) {
          setIsOver(true);
          // alert("Bạn đã thua");
          return prev;
        }
        if(prev.some(s=> s.x === newHead.x && s.y === newHead.y)) {
          setIsOver(true);
          return prev;
        }
        const next = [newHead, ...prev];
        // checkpoint 
        if (isCheckPointSymetry(newHead)) {
          setScore(prev => { console.log('pre: ', prev);
           return prev + 1});  
          const newCheckPoint = checkpoint.filter((point)=> !(point.x === newHead.x && point.y === newHead.y) )

          setCheckPoint(newCheckPoint)
        } else {
          next.pop();
        }
        return next;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [map, checkpoint, isOver, isPause]);

  useEffect(()=>{
    if (checkpoint.length >= 3) return 
    const newPointList = [...checkpoint]
    do {
      let newPoint: SymmetryType = {
        x: Math.floor(Math.random() * count),
        y: Math.floor(Math.random() * count),
      };

      let isOnSnake: boolean = snake.some(
        (s) => s.x === newPoint.x && s.y === newPoint.y
      ) || isCheckPointSymetry(newPoint)

      if (!isOnSnake) newPointList.push(newPoint) 
    } while (newPointList.length < 3);
    setCheckPoint(newPointList);
    
  },[score])

  const isCheckPointSymetry = ({x, y}: SymmetryType) => {
    return checkpoint.some(
        (c) => c.x === x && c.y === y
      )
  }


  const getBoard = (x: number, y: number) => {
    if (isCheckPointSymetry({x , y})) {
      return "checkpoint";
    }
    if(snake.length === 0) {
      return "emty";
    }     
    if (snake[0].x === x && snake[0].y === y) {
      return "head";
    }
    if (snake.some((s) => s.x === x && s.y === y)) {
    return "body";
    }
  };
  const handleStart = () => {
    // công thức: random * (max - min) + min
    const x = Math.floor(Math.random() * (15 - 5) + 5)
    const y = Math.floor(Math.random() * (15 - 5) + 5)
    const isHorizontal = Math.random() < 0.5
    const isCount = Math.random() < 0.5
    const newSnake = [{x, y}]
    const symmetryChance: SymmetryType = isHorizontal 
                                       ? {x: isCount ? 1 : -1, y: 0 }
                                       : {x: 0, y: isCount ? 1 : -1 }
    for (let i = 0; i < 3; i ++) {
        const head = newSnake[i];
        const newHead = { x: head.x - symmetryChance.x, y: head.y - symmetryChance.y };
        newSnake.push(newHead)
    }
    setMap(symmetryChance)
    setSnake(newSnake)
    setScore(0);  
  }

  // Handle and Use button UP DOWN LEFT RIGHT
  const handleUp = () => {
    console.log("đã vào đây: ", map);
    
    if (map.y !== 1) {
      setMap({x:0, y: -1})
    }
  }

  const handleDown = () => {
    if(map.y !== -1) {
      setMap({x:0, y:1})
    }
  }

  const handleLeft = () => {
    if(map.x !== 1) {
      setMap({x:-1, y:0})
    }
  }

  const handleRight = () => {
    if(map.x !== -1) {
      setMap({x:1, y:0})
    }
  }
  const handleReset = () => {
    setIsOver(false);
    handleStart();
  }
  const handlePause = () => {
    setIsPause(!isPause);
  }
  return (
    <section className="flex flex-col justify-center items-center h-dvh">
      <section className="w-[40vw] aspect-square border border-black">
        <div 
        className="grid" 
        style={{gridTemplateColumns : `repeat(${count},1fr)` }}>
          {
            Array.from({ length: count }).map((_v, key1) => {
              return Array.from({ length: count }).map((_v, key2) => {
                const type = getBoard(key2, key1);
                return (
                  <div
                    key={`matrix-${key1}-${key2}`}
                    className={`w-full aspect-square border border-blue-300 
                    ${type === 'head' ? 'bg-amber-300' : ''} 
                    ${type === 'body' ? 'bg-sky-300' : ''} 
                    ${type === 'checkpoint'? 'bg-red-600!' : ''}`}
                  ></div>
                );
              });
            })
          }
        </div>
      </section>
      <section className="flex gap-2">
        <div className="flex justify-center items-center mt-3 border-2 w-10 h-10 " onClick={handlePause}>{isPause ? <Play/>: <Pause/>}</div>
        {/* <div className="flex justify-center items-center mt-3 border-2 w-10 h-10 " onClick={handleLeft}><ArrowLeft /></div>
        <div className="flex justify-center items-center mt-3 border-2 w-10 h-10 " onClick={handleUp}><ArrowUp /></div>
        <div className="flex justify-center items-center mt-3 border-2 w-10 h-10 " onClick={handleDown}><ArrowDown /></div>
        <div className="flex justify-center items-center mt-3 border-2 w-10 h-10 " onClick={handleRight }><ArrowRight /></div> */}
        <div className="flex justify-center items-center mt-3 border-2 w-20 h-10 text-sm" >Score: {score}</div>
        
      </section>
      {isOver && (
        <div className= "fixed inset-0 flex justify-center items-center backdrop-blur-5px">
          <div className=" text-white bg-red-500 border-2 border-amber-950 ">
            Bạn đã thua !
          <button className="border-2 border-amber-950 ml-2 text-white bg-blue-800 " onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </section> 
  );
}

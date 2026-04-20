import { useState } from 'react'
import './App.css'
import circle from "./assets/circle.png"
import cross from "./assets/cross.png"

type TicTacType = 'o' | 'x' | ''  
// let data = ["","","","","","","","","",];
// ma tran 3x3 
// 3 hàng là 3 array con 
// 3 phần tử
// let data =[
//   ["","",""],
//   ["","",""],
//   ["","",""]
// ]; // 3 ở đuôi, 3 hàng
  const playerColor: Record<string, TicTacType> = {
    "xanh": 'o',
    "do": 'x'
  }

function getListChain(ticTacList: TicTacType[][], [o1, o2]: number[], [sx1, sy1]: number[]) {
  const sx0 = 2 * sx1 - o1
  const sy0 = 2 * sy1 - o2
  const sx2 = o1
  const sy2 = o2
  const sx3 = 2 * o1 - sx1
  const sy3 = 2 * o2 - sy1
  const sx4 = 2 * sx3 - o1
  const sy4 = 2 * sy3 - o2
  const listChain = [
    {
      symmetric: [sx0, sy0],
      data: ticTacList?.[sx0]?.[sy0] || ''
    },
    {
      symmetric: [sx1, sy1],
      data: ticTacList?.[sx1]?.[sy1] || ''
    },
    {
      symmetric: [sx2, sy2],
      data: ticTacList?.[sx2]?.[sy2] || ''
    },
    {
      symmetric: [sx3, sy3],
      data: ticTacList?.[sx3]?.[sy3] || ''
    },
    {
      symmetric: [sx4, sy4],
      data: ticTacList?.[sx4]?.[sy4] || ''
    },
  ]
  return listChain
}

function App() {
  const [player, setPlayer] = useState<'xanh' | 'do'>('xanh')
  const [data, setData] = useState<TicTacType[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [winner, setWinner] = useState<TicTacType | 'draw' | null>(null)

  function checkWinner(ticTacList: TicTacType[][], key1: number, key2: number, currentChar: TicTacType) {
    if (!currentChar) return null
    const directions = [[key1 - 1, key2 - 1], [key1 - 1, key2], [key1 - 1, key2 + 1], [key1, key2 - 1]]
    for (const dir of directions) {
      const chain = getListChain(ticTacList, [key1, key2], dir)
      for (let i = 0; i <= 2; i++) {
        const a = chain[i]?.data === currentChar
        const b = chain[i + 1]?.data === currentChar
        const c = chain[i + 2]?.data === currentChar
        if (a && b && c) {
          const coords = [chain[i].symmetric, chain[i + 1].symmetric, chain[i + 2].symmetric]
          return coords
        }
      }
    }
    return null
  }

  function playerClick(key1: number, key2: number) {
    if (winner) return
    if (data?.[key1]?.[key2] !== '') return

    const newData = structuredClone(data)
    const currentChar = playerColor[player]
    newData[key1][key2] = currentChar
    setData(newData)

    const found = checkWinner(newData, key1, key2, currentChar)
    if (found) {
      setWinner(currentChar)
      setTimeout(() => alert('Bạn đã thắng!'))
      return
    }
    setPlayer(pre => pre === 'do' ? 'xanh' : 'do')
  }

  function reset() {
    setData([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setPlayer('xanh')
    setWinner(null)
  }

  return (
    <main 
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <section 
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }} 
      >
        {
          data.map((lv1:Array<TicTacType>, key1) => {
            return <div style={{display: "flex", gap:"8px"}} key={`item-lv1-${key1}`}>
              {
                lv1.map((lv2: TicTacType, key2)=>{
                  return <div key={`item-lv2-${key2}`} onClick={(e) => {
                    playerClick(key1, key2)
                  }}
                  style={{width:"200px", aspectRatio:"1", backgroundColor: "yellow", lineHeight: "200px", textAlign: "center", fontSize: "96px"
                  }}> 
                    {
                      lv2 === 'o' && <img src={circle} alt="" />
                    }
                    {
                      lv2 === 'x' && <img src={cross} alt="" />
                    }
                  </div>
                })
              }
            </div>
          })
        }
        <div style={{ marginTop: 12 }}>
          <button onClick={reset}>Reset</button>
        </div>
      </section>
    </main>
  )
}
export default App;

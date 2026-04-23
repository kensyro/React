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
  const [winner,setWinner] = useState<number[][] | undefined>()  

  function playerClick(key1: number, key2: number) {
    if(data[key1][key2] !== '') {
      alert("Ô đã được chọn, vui lòng chọn ô khác")
      return
    }
    console.log('current winner: ',winner);
    if(!setWinner){
      alert("Trận đấu đã kết thúc")
      return
    }    

    const newData = structuredClone(data)
    const currentChar = playerColor[player]
    newData[key1][key2] = currentChar
    // luu ythay doi O thanh X kh bi gi nhe
    setData(newData)
    const listKey = [[key1 - 1, key2 -1], [key1 -1,key2], [key1-1,key2+1], [key1,key2-1]]
    for(let i = 0; i< listKey.length; i++) {
      const listMatrix = getListChain(newData, [key1, key2], listKey[i])
      for(let i = 0; i < listMatrix.length -2; i++) {
        const a = listMatrix[i]
        const b = listMatrix[i+1]
        const c = listMatrix[i+2]
        console.log({
          a,
          b,
          c
        });
        
        if(a.data===b.data&&b.data===c.data){
          setTimeout(()=> alert(`${player} đã chiến thắng`), 0)
          setWinner([
            a.symmetric,
            b.symmetric,
            c.symmetric,
          ])
          return
        }
      }
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
    setWinner([])
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
                  const isWinnerBox = winner?.findIndex((element) => {
                     if(element[0] === key1 && element[1] === key2) {
                      return true;
                     } else {
                      return false;
                     }                     
                  })
                  console.log({
                    key1,
                    key2,
                    checkIndex: isWinnerBox
                  });
                  
                  return <div key={`item-lv2-${key2}`} onClick={(e) => {
                    playerClick(key1, key2)
                  }}
                  style={{width:"200px", 
                    aspectRatio:"1", 
                    backgroundColor: isWinnerBox !== undefined && isWinnerBox !== -1 ? "red" : 'yellow' ,
                    lineHeight: "200px", textAlign: "center", fontSize: "96px"                                 
                  }}
                  > 
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

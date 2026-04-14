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

 function App () {
  //ma trận 3x3
  const [player, setPlayer] = useState<'xanh'|'do'>('xanh')
  const [data, setData] = useState<TicTacType[][]>([
    ['','',''],
    ['','',''],
    ['','','']
  ])

  function playerClick(key1:number, key2: number) {
    const newData = structuredClone(data)
    newData[key1][key2] = playerColor[player]
    setData(newData)
    setPlayer(pre => pre === 'do' ? 'xanh' : 'do')
    if(key2 ){
       alert("Ban da win")
    } 
    else {

    }
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
      </section>
    </main>
  )
}
export default App;

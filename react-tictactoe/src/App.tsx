import { useState } from 'react'
import './App.css'
import circle from "./assets/circle.png"
import cross from "./assets/cross.png"

let data = ["","","","","","","","","",];

function App() {
  return (
    <>
      <div className='container'>
        <h1 className="tile">Tic Tac Toe Game</h1>
        <div className="board">
          <div className="row1">
            <div className="boxes"></div>
            <div className="boxes"></div>
            <div className="boxes"></div>
          </div>
          <div className="row2">
            <div className="boxes"></div>
            <div className="boxes"></div>
            <div className="boxes"></div>
          </div>
          <div className="row3">
            <div className="boxes"></div>
            <div className="boxes"></div>
            <div className="boxes"></div>
          </div>
        </div>
        <button className="reset">Reset</button>
      </div>
    </>
  )
}

export default App;

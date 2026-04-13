import { useState } from 'react'
import './App.css'

type JsonToDoList = {
  id: number,
  title: string
}

const jsonToDoList: Array<JsonToDoList> = [
  {
    id: 1,
    title: "Học bài"
  },
  {
    id: 2,
    title: "Đi chơi"
  },
  {
    id: 3,
    title: "Nấu cơm"
  }
]

function App() {
    const [todoList, setTodoList] = useState(jsonToDoList);
    const [newToDo, setNewtoDo ] = useState<string>("");
    return (
      <>
      <form onSubmit={(event) => {
          event.preventDefault();
          const newList = todoList.concat([
            {title: newToDo, id: Math.random()},
          ]);
          setTodoList(newList);
          setNewtoDo(""); 
      }}>
        
        <input          
          type="text"
          value={newToDo} 
          onChange={(event) => {
            event.target.value;
            console.log("Value", event.target.value);
            setNewtoDo(event.target.value);
          }}
        />
        <button type='submit'>Add To Do</button>
      </form>
      {
        todoList.map((todoItem) => {
          return (
            <form 
            style={{
              display: "flex",
              gap: "50px",
            }}
            key={todoItem.id}
            >
            <p>{todoItem.title}</p>  
            </form>
          )
        })
      }
      </>
    )
}

export default App;

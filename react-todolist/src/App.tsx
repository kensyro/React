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
    const [TodoList, setTodoList] = useState(jsonToDoList);
    const [NewtoDo, setNewtoDo ] = useState<string>("");
    const [IdChanged, setIdChanged ] = useState<number | null >(null);
    const [NewChange, setNewChange ] = useState("");
    return (
      <>
      <form onSubmit={(event) => {
          event.preventDefault();
          const newList = TodoList.concat([
            {title: NewtoDo, id: Math.random()},
          ]);
          setTodoList(newList);
          setNewtoDo(""); 
      }}>
        
        <input          
          type="text"
          value={NewtoDo} 
          onChange={(event) => {
            event.target.value;
            console.log("Value", event.target.value);
            setNewtoDo(event.target.value);
          }}
        />
        <button type='submit'>Add To Do</button>
      </form>
      {
        TodoList.map((todoItem) => {
          return (
            <form 
              style={{
                display: "flex",
                gap: "5px",
              }}
              key={todoItem.id}
              >
              <p>{todoItem.title}</p>

              <button
              type='button'
              onClick={(event) => {
                setIdChanged(todoItem.id);
                setNewChange(todoItem.title);
              }}
              > Sửa
              </button>  
              <button
              type='button'
              onClick={(event)=> {
                const newArr = TodoList.filter(
                  (item)=> item.id !== todoItem.id,
                );
                setTodoList(newArr);
              }}
              >
                Xóa
              </button>
            </form>
          )
        })
      }
      {
        IdChanged && (
          <div>
            <input type="text" />
          </div>
        )
      }
      </>
    )
}

export default App;

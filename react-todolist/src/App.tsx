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
      <div className="pxl-arcade">
        <div className="cabinet">
          <div className="cabinet-header">TASK TO DO LIST </div>

          <div className="pxl-todo">
            <div className="pxl-list">
              {TodoList.map((todoItem) => {
                return (
                  <div className="todo-item" key={todoItem.id}>
                    <div>{todoItem.title}</div>
                    <div style={{display: 'flex', gap: 8}}>
                      <button
                        type='button'
                        className='btn'
                        onClick={() => {
                          setIdChanged(todoItem.id);
                          setNewChange(todoItem.title);
                        }}
                      >Update</button>
                      <button
                        type='button'
                        className='btn'
                        onClick={() => {
                          const newArr = TodoList.filter(
                            (item) => item.id !== todoItem.id,
                          );
                          setTodoList(newArr);
                        }}
                      >Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="pxl-controls">
              <form onSubmit={(event) => {
                  event.preventDefault();
                  const newList = TodoList.concat([
                    {title: NewtoDo, id: Math.random()},
                  ]);
                  setTodoList(newList);
                  setNewtoDo(""); 
              }}>
                <div className="pxl-input">
                  <input
                    type="text"
                    placeholder="New task"
                    value={NewtoDo}
                    onChange={(event) => setNewtoDo(event.target.value)}
                  />
                  <button type='submit' className='btn'>ADD</button>
                </div>
              </form>            
            </div>
          </div>

          {IdChanged !== null && (
            <section
              style={{
                position: "fixed",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
              }}>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  setIdChanged(null);
                  const newListChange = TodoList.map((currentTodo) => {
                    return currentTodo.id === IdChanged
                      ? {
                          ...currentTodo,
                          title: NewChange,
                        }
                      : currentTodo;
                  });
                  setTodoList(newListChange);
              }}>
                <input 
                  type="text"
                  value={NewChange}
                  className='border-2! border-black'
                  onChange={(e)=>{
                    setNewChange(e.target.value);
                  }}
                />
                <button type='submit' className='btn'>Done</button>
              </form>
            </section>
          )}
        </div>
      </div>
    )
}

export default App;

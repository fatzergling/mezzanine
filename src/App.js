import React, { useState } from "react";
import "./App.css";

function Todo({ todo, index, completeTodo, removeTodo, uncompleteToDo}) {
  return (
      <div
          className="todo"
          style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        {todo.text}

        <div>
          <button onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => uncompleteToDo(index)}>Un-Complete</button>

          <button onClick={() => removeTodo(index)}>x</button>
        </div>
      </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };


  return (
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            className="input"
            value={value}
            onChange={e => setValue(e.target.value)}
        />
      </form>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const uncompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };


  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
      <div className="app">
        <div className="todo-list">
          {todos.map((todo, index) => (
              <Todo
                  key={index}
                  index={index}
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  uncompleteToDo={uncompleteTodo}
              />
          ))}
          <TodoForm addTodo={addTodo} />
        </div>
        <div className="incomplete">
          Incomplete: {
          todos.reduce(function(accumulator, currentValue, currentIndex, array) {
                return accumulator + (currentValue.isCompleted == false || currentValue.isCompleted == null);
              }
              ,0
          )
        }
          &nbsp;&nbsp;
              Complete: {
          todos.reduce(function(accumulator, currentValue, currentIndex, array) {
                return accumulator + (currentValue.isCompleted == true);
              }
              ,0
          )
        }
        </div>

      </div>
  );
}

export default App;

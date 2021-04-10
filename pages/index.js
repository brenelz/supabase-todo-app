import { useState } from "react";

export default function Home({ todos }) {
  const newTodo = "";
  const allTodos = [];

  const addTodo = async () => {};

  const completeTodo = async (id) => {};

  const deleteTodo = async (id) => {};

  return (
    <div className="max-width-container">
      <h1>Supabase Todo List</h1>
      <label>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add New Todo</button>
      </label>
      <hr />
      <ul>
        {allTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <strike>{todo.title}</strike> : todo.title}
            <button className="complete" onClick={() => completeTodo(todo.id)}>
              Complete
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

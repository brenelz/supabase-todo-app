import { useState } from "react";
import supabase from "../utils/initSupabase";

export default function Home({ todos }) {
  const [newTodo, setNewTodo] = useState("");
  const [allTodos, setTodos] = useState(todos || []);

  const addTodo = async () => {
    const result = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ newTodo }),
    });
    const data = await result.json();

    setNewTodo("");
    setTodos((state) => [...state, data.todo]);
  };

  const completeTodo = async (id) => {
    const result = await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify({ id, completed: true }),
    });
    const data = await result.json();

    setTodos((state) =>
      state.map((todo) => (todo.id !== data.todo.id ? todo : data.todo))
    );
  };

  const deleteTodo = async (id) => {
    const result = await fetch("/api/todos", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await result.json();

    setTodos((state) => state.filter((todo) => todo.id !== data.todo.id));
  };

  return (
    <div>
      <h1>Supabase Todo List</h1>
      <label>
        Add New Todo
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </label>
      <hr />
      <ul>
        {allTodos.map((todo) => (
          <li key={todo.id}>
            {todo.completed ? <strike>{todo.title}</strike> : todo.title}
            <button onClick={() => completeTodo(todo.id)}>Complete</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from("todos").select("id, title, completed");

  return {
    props: {
      todos: data,
    },
  };
}
